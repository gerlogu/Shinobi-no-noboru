package es.urjc.code.daw;

import java.io.IOException;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ChatHandler extends TextWebSocketHandler {

	private WebSocketSession sessionOne;
	private WebSocketSession sessionTwo;
	private int idOne = 1;
	private int idTwo = 2;
	private ObjectMapper mapper = new ObjectMapper();

	//Método que se ejecuta tras establecerse la conexión.
	//Si la sesión del "jugador 1" está vacía, se guardá la sesión ahí. Si no, se guardá en el jugador 2. Si ambos están llenos, no se guardá pues no pueden entrar más jugadores.
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		if(sessionOne == null) {
			sessionOne = session;
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("playerID", idOne);
			session.sendMessage(new TextMessage(newNode.toString()));
		}else if(sessionTwo == null) {
			sessionTwo = session;
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("playerID", idTwo);
			session.sendMessage(new TextMessage(newNode.toString()));
		}else {
			System.out.println("Impossible to establish connection. The lobby is full, so the session with id: " + session.getId() + " can't connect.");
		}	
		
	}
	
	//Método que se ejecuta tras cerrar la conexión
	//Si la sesión cerrada es igual a la sesión 1, esta se borra, sino se borra la 2.
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		if(session.equals(sessionOne)) {
			sessionOne = null;
		}else if(session.equals(sessionTwo)){
			sessionTwo = null;
		}
	}
	
	//Método que gestiona los mensajes que llegan
	//En función del contenido del mensaje se ejecuta un método u otro
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		if(node.get("index") != null) {
			sendIndexOtherParticipants(session, node);
		}else if(node.get("colsX")!=null){
			sendColsOtherParticipants(session, node);
		}else {
			sendCoordsOtherParticipants(session, node);
		}
	}
	
	//Método que se ejecuta cuando se envían las coordenadas de los jugadores.
	//Se crea un nuevo objecto, y se envía al otro jugador.
	private void sendCoordsOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		//System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("Xvel", node.get("Xvel").asDouble());
		newNode.put("Yvel", node.get("Yvel").asDouble());
		newNode.put("Xcoord", node.get("Xcoord").asDouble());
		newNode.put("Ycoord", node.get("Ycoord").asDouble());
		
		if(session.equals(sessionOne) && sessionTwo != null) {
			sessionTwo.sendMessage(new TextMessage(newNode.toString()));
		}else if(session.equals(sessionTwo) && sessionOne != null) {
			sessionOne.sendMessage(new TextMessage(newNode.toString()));
		}
			
	}
	
	//Método que se ejecuta cuando se envía un índice de un tronco para que caiga.
	//Se crea un nuevo objecto, y se envía al otro jugador.
	private void sendIndexOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("index", node.get("index").asDouble());
		
		if(session.equals(sessionOne) && sessionTwo != null) {
			sessionTwo.sendMessage(new TextMessage(newNode.toString()));
		}else if(session.equals(sessionTwo) && sessionOne != null) {
			sessionOne.sendMessage(new TextMessage(newNode.toString()));
		}
	}
	
	
	//Método que se ejecuta cuando se envían las coordenadas de los coordenadas.
	//Se crea un nuevo objecto, y se envía al otro jugador.
	private void sendColsOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("colsX", node.get("colsX"));
		newNode.put("colsY", node.get("colsY"));
		
		if(session.equals(sessionOne) && sessionTwo != null) {
			sessionTwo.sendMessage(new TextMessage(newNode.toString()));
		}else if(session.equals(sessionTwo) && sessionOne != null) {
			sessionOne.sendMessage(new TextMessage(newNode.toString()));
		}
	}

}
