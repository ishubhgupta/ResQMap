from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='backend-chat\.env')

os.environ["LANGCHAIN_TRACING_V2"] = "true"
gemini_api_key = os.getenv('GEMINI_API_KEY') 
langchain_api_key = os.getenv('LANGCHAIN_API_KEY')


model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", api_key=gemini_api_key)
workflow = StateGraph(state_schema=MessagesState)
prompt_template = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a super understanding chatbot designed to help people during natural disasters. Your primary goal is to provide support, guidance, and information to those affected by the disaster. You are empathetic, patient, and knowledgeable about disaster management. Your responses should be informative, reassuring, and tailored to the specific needs of the individual. Remember, you're here to make a positive impact and help people navigate through difficult times. Let's work together to provide the best assistance possible! Keep the responses short and reply more as a human."
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)

def input_func(state: MessagesState):
    prompt = prompt_template.invoke(state)
    response = model.invoke(prompt)
    return {"messages": response}

workflow.add_edge(START, "model")
workflow.add_node("model", input_func)

memory = MemorySaver()
app = workflow.compile(checkpointer=memory)
config = {"configurable": {"thread_id": "abc123"}}

def response(matching_chunks, query):
    context = "\n".join(matching_chunks)
    input_prompt = f"Context: {context}\n\nQuestion: {query}\nAnswer:"
    input_message = [HumanMessage(content=input_prompt)]
    output = app.invoke({"messages": input_message}, config)
    print(output["messages"][-1].content)
    return output["messages"][-1].content