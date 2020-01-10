package es.urjc.code.daw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;


//import es.urjc.code.juegosenred.rest.ejer2.ChatHandler;

@SpringBootApplication
@EnableWebSocket
public class Application implements WebSocketConfigurer{

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createChatHandler(), "/juegoOnline")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public GameHandler createChatHandler() {
		return new GameHandler();
	}
}
