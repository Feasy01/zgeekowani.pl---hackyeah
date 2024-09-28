from langchain_ollama import ChatOllama

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from langchain.prompts import ChatPromptTemplate

from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import HumanMessage

# ------------------------------------ LLM ----------------------------------- #
llm = ChatOllama(model="llama3.1")

# ---------------------------------- PROMPTS --------------------------------- #
system_prompt_template = """You are an AI assistant for users of the system for secure payments with cryptocurrencies. The system is based on a web application. Your goal is to provide help by answering users’ questions. 
There are two types of questions: 
- First is related to the system (for example how to use the system)
- Second is related to how cryptocurrencies or blockchain works in general 
To answer questions about the system use the following context (got from systems’ documentation): {context}. 
To answer general questions about cryptocurrencies, use your knowledge.
Use the same language as the user 
"""
system_prompt = ChatPromptTemplate.from_template(system_prompt_template)

contextualize_q_system_prompt = """Given a chat history and the latest user question \
which might reference context in the chat history, formulate a standalone question \
which can be understood without the chat history. Do NOT answer the question, \
just reformulate it if needed and otherwise return it as is.
Use the same language as the user"""

contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)

# --------------------------------- LOAD DOCS -------------------------------- #
def _load_docs():
    loader = TextLoader("./authoreum_docs.txt")
    docs = loader.load()

    return docs

# -------------------------------- SPLIT DOCS -------------------------------- #
def _split_docs():
    docs = _load_docs()
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=50)

    splits = text_splitter.split_documents(docs)

    return splits

# -------------------------------- INDEX DOCS -------------------------------- #
def _index_splits():
    splits = _split_docs()
    embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-base-en-v1.5")

    vectorstore = FAISS.from_documents(documents=splits,
                                        embedding=embeddings)

    retriever = vectorstore.as_retriever()

    return retriever

def get_rag_chain():
    retreiver = _index_splits()
    history_aware_retriever = create_history_aware_retriever(llm, retreiver, contextualize_q_prompt)

    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt_template),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    return rag_chain
