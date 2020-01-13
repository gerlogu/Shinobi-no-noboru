package es.urjc.code.daw;

import java.util.Collection;
import java.io.IOException;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import java.io.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@EnableScheduling
@CrossOrigin
@RestController
@RequestMapping("/server")
public class PlayersController {

	private Player Player1 = null;
	private Player Player2 = null;
	private int jumpedLogs1 = 0;
	private int jumpedLogs2 = 0;
	private int victoriesOchreNinjas = 0;
	private int victoriesPurpleNinjas = 0;
	private AtomicLong lastId = new AtomicLong();
	private String[] lines = new String[100];
	boolean player1Exists = false;
	boolean player2Exists = false;
	boolean[] playerReady = {false, false};
	boolean gameReady = false;
	boolean gameStarted = false;
	
	String line1 = "";
	String line2 = "";
	String line3 = "";
	
	
	private int timer1 = 5;
	private int timer2 = 5;

	File file = new File("Players.txt");
	
	
	/**
	 *Actualiza el estado del jugador 1 para ver si esta listo o no.
	 * @param ready
	 * @return ready
	 */
	@PutMapping("/player1Ready")
	public boolean SetPlayer1Ready(@RequestBody boolean ready) {

		playerReady[0] = ready;

		return ready;
	}
	
	/**
	 * Actualiza el estado del jugador 2 para ver si está listo o no.
	 * @param ready
	 * @return ready
	 */
	@PutMapping("/player2Ready")
	public boolean SetPlayer2Ready(@RequestBody boolean ready) {

		playerReady[1] = ready;

		return ready;
	}
	
	/**
	 * Devuelve si el jugador 1 está listo o no.
	 * @return r
	 */
	@GetMapping("/player1Ready")
	public ResponseEntity<Boolean> GetPlayer1Ready() {
		
		boolean r = playerReady[0];

		return new ResponseEntity<>(r, HttpStatus.OK);
	 
	}
	

	/**
	 * Comprueba si la partida ha comenzado.
	 * @return r
	 */
	@GetMapping("/gameStarted")
	public ResponseEntity<Boolean> GetGameStarted() {
		
		boolean r = gameStarted;

		return new ResponseEntity<>(r, HttpStatus.OK);
	 
	}
	
	/**
	 * Actualiza el estado de la partida.
	 * @param s
	 * @return s
	 */
	@PutMapping("/updateGameStarted")
	public boolean updateGameStarted(@RequestBody boolean s) {

		gameStarted = s;
		
		return s;
	}
	
	
	/**
	 * Devuelve si el jugador 2 está listo o no.
	 * @return r
	 */
	@GetMapping("/player2Ready")
	public ResponseEntity<Boolean> GetPlayer2Ready(){
		boolean r = playerReady[1];

		return new ResponseEntity<>(r, HttpStatus.OK);
	 
	}
	
	/**
	 * Devuelve si la partida está lista para comenzar.
	 * @return g
	 */
	@GetMapping("/gameReady")
	public ResponseEntity<Boolean> GetGameReady(){
		boolean g;
		if(playerReady[0] && playerReady[1]) {
			gameReady = true;
			g = gameReady;
		}else {
			gameReady = false;
			g = gameReady;
		}
		

		return new ResponseEntity<>(g, HttpStatus.OK);
	 
	}
	
	/**
	 * Devuelve los temporizadores que controlan si los jugadores siguen presentes en la sala.
	 * @return timers
	 */
	@GetMapping("/getTimers")
	public ResponseEntity<Integer[]> getTimers(){
		Integer[] timers = new Integer[2];
		timers[0]=timer1;
		timers[1]=timer2;
		
		if (timers != null) {
			return new ResponseEntity<>(timers, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Actualiza el temporizador que controla si el jugador 1 sigue presente en la sala.
	 * @param newtimer
	 * @return newtimer
	 */
	@PutMapping("/updateTimer1")
	public int updateTimer1(@RequestBody int newtimer) {

		timer1 = newtimer;
		
		return newtimer;
	}
	
	/**
	 * Actualiza el temporizador que controla si el jugador 2 sigue presente en la sala.
	 * @param newtimer
	 * @return newtimer
	 */
	@PutMapping("/updateTimer2")
	public int updateTimer2(@RequestBody int newtimer) {
		//if(id==1) {
			timer2 = newtimer;
		//}		
		/*if(id==1) {
			timer2 = newtimer;
		}*/
		
		return newtimer;
	}
	
	/**
	 * Actualiza el log del chat.
	 * @param newLine
	 * @return newLine
	 */
	@PutMapping("/updateChat")
	public String updateChat(@RequestBody String newLine) {

			line3 = line2;
			line2 = line1;
			line1 = newLine;
		
		return newLine;
	}
	
	/**
	 * Devuelve el último mensaje enviado al chat.
	 * @return line1
	 */
	@GetMapping("/getLine1")
	public ResponseEntity<String> getLine1(){
		
		if (line1 != null) {
			return new ResponseEntity<>(line1, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Devuelve el penúltimo mensaje enviado al chat.
	 * @return line2
	 */
	@GetMapping("/getLine2")
	public ResponseEntity<String> getLine2(){
		
		if (line2 != null) {
			return new ResponseEntity<>(line2, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Devuelve el antepenúltimo mensaje enviado al chat.
	 * @return line3
	 */
	@GetMapping("/getLine3")
	public ResponseEntity<String> getLine3(){
		
		if (line3 != null) {
			return new ResponseEntity<>(line3, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Devuelve el número de victorias del jugador ocre.
	 * @return victoriesOchreNinjas
	 */
	@GetMapping("/ochreVictories")
	public ResponseEntity<Integer> getVictoriesOchre() throws IOException{
		int victoriesOchre = victoriesOchreNinjas;
		
		return new ResponseEntity<>(victoriesOchre, HttpStatus.OK);
	}
	
	/**
	 * Devuelve el número de victorias del jugador púrpura.
	 * @return victoriesPurpleNinjas
	 */
	@GetMapping("/purpleVictories")
	public ResponseEntity<Integer> getVictoriesPurple() throws IOException{
		int victoriesPurple = victoriesPurpleNinjas;
		
		return new ResponseEntity<>(victoriesPurple, HttpStatus.OK);
	}
	
	/**
	 * Actualiza el número de victorias del jugador ocre.
	 * @param newVictories1
	 * @return newVictories1
	 * @throws IOException
	 */
	@PutMapping("/updateOchreVictories")
	@ResponseStatus(HttpStatus.CREATED)
	public int updateVictories1(@RequestBody int newVictories1)throws IOException{
		if(Player2 != null)
		victoriesOchreNinjas = newVictories1;
		//saveStats();
		return newVictories1;
	}
	
	/**
	 * Devuelve el nickname del jugador púrpura.
	 * @return nick
	 */
	@GetMapping("/playerStats/nickname1")
	public ResponseEntity<String> getPlayer1Nickname(){
		String nick = Player1.getNickname();
		
		return new ResponseEntity<>(nick, HttpStatus.OK);
	}
	
	/**
	 * Devuelve el nickname del jugador ocre.
	 * @return nick
	 */
	@GetMapping("/playerStats/nickname2")
	public ResponseEntity<String> getPlayer2Nickname(){
		String nick = Player2.getNickname();
		
		return new ResponseEntity<>(nick, HttpStatus.OK);
	}

	/**
	 * Actualiza el número de victorias del jugador púrpura-
	 * @param newVictories2
	 * @return newVictories2
	 * @throws IOException
	 */
	@PutMapping("/updatePurpleVictories")
	@ResponseStatus(HttpStatus.CREATED)
	public int updateVictories2(@RequestBody int newVictories2)throws IOException{
		if(Player1 != null)
		victoriesPurpleNinjas = newVictories2;
		//saveStats();
		return newVictories2;
	}
	
	/**
	 * Crea un jugador dentro del lobby.
	 * @param player
	 * @return player
	 * @throws IOException
	 */
	@PostMapping("/players/createPlayer")
	@ResponseStatus(HttpStatus.CREATED)
	public Player nuevoPlayer1(@RequestBody Player player) throws IOException{

		
		if(Player1!=null && Player2!=null) {
			return null;
		}else if(Player1 == null) {
			player.setId(1);
			
			if(Player2!=null && player.getNickname().equals(Player2.getNickname())) {
				player.setNickname(player.getNickname() + "(2)");
			}else {
				player.setNickname(player.getNickname());
			}
			
			Player1 = player;
			loadStats();

		}else {
			player.setId(2);
			
			if(Player1!=null && player.getNickname().equals(Player1.getNickname())) {
				player.setNickname(player.getNickname() + "(2)");
			}else {
				player.setNickname(player.getNickname());
			}
			
			player.setNickname(player.getNickname());
			Player2 = player;
			loadStats();

		}
		
		return player;
	}
	
	/**
	 * Devuelve el número de saltos que ha realizado el jugador púrpura.
	 * @return logs1
	 */
	@GetMapping("/player1Stats/Jumps")
	public ResponseEntity<Integer> getLogs1() {
		int logs1 = jumpedLogs1;
		
		return new ResponseEntity<>(logs1, HttpStatus.OK);
	}
	
	/**
	 * Devuelve el número de saltos que ha realizado el jugador ocre.
	 * @return logs2
	 */
	@GetMapping("/player2Stats/Jumps")
	public ResponseEntity<Integer> getLogs2() {
		int logs2 = jumpedLogs2;
		
		return new ResponseEntity<>(logs2, HttpStatus.OK);
	}
	
	/**
	 * Actualiza el número de saltos que ha realizado el jugador púrpura.
	 * @param newLogs1
	 * @return newLogs1
	 * @throws IOException
	 */
	@PutMapping("/logs1")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Integer> updateScore1(@RequestBody int newLogs1) throws IOException{
		jumpedLogs1 = newLogs1;
		saveStats();
	
		return new ResponseEntity<>(newLogs1, HttpStatus.OK);
	}
	
	/**
	 * Actualza el número de saltos que ha realizado el jugador ocre.
	 * @param newLogs2
	 * @return newLogs2
	 * @throws IOException
	 */
	@PutMapping("/logs2")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Integer> updateLogs2(@RequestBody int newLogs2) throws IOException{
		jumpedLogs2 = newLogs2;
		saveStats();
		
		return new ResponseEntity<>(newLogs2, HttpStatus.OK);
	}
	
	/**
	 * Devuelve al jugador púrpura.
	 * @return player1
	 */
	@GetMapping("/players/getPlayer1")
	public ResponseEntity<Player> getPlayer1() {

		Player player1 = Player1;

		if (player1 != null) {
			return new ResponseEntity<>(player1, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Devuelve al jugador ocre.
	 * @return
	 */
	@GetMapping("/players/getPlayer2")
	public ResponseEntity<Player> getPlayer2() {

		Player player2 = Player2;

		if (player2 != null) {
			return new ResponseEntity<>(player2, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Devuelve a ambos jugadores.
	 * @return players
	 */
	@GetMapping("/players/getPlayers")
	public ResponseEntity<Player[]> getPlayers() {
		
		Player player1 = Player1;
		Player player2 = Player2;
		
		Player players[] = new Player[2]; 
		players[0]=player1;
		players[1]=player2;

		if (players[0] != null || players[1]!=null) {
			return new ResponseEntity<>(players, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Devuelve que el servidor está activo.
	 * @return true
	 */
	@GetMapping("/activeServer")
	public boolean activeServer() {	
		return true;
	}
	
	/**
	 * Destruye al jugador púrpura.
	 * @return player1
	 */
	@DeleteMapping("/players/deletePlayer1")
	public ResponseEntity<Player> deletePlayer1() {

		Player player1 = Player1;
		Player1 = null;

		if (player1 != null) {
			return new ResponseEntity<>(player1, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Destruye al jugador ocre.
	 * @return player2
	 */
	@DeleteMapping("/players/deletePlayer2")
	public ResponseEntity<Player> deletePlayer2() {
		Player player2 = Player2;
		Player2 = null;

		if (player2 != null) {
			return new ResponseEntity<>(player2, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
		}
	}
	
	/**
	 * Destruye a ambos jugadores
	 * @return players
	 */
	@DeleteMapping("/players/deletePlayers")
	public ResponseEntity<Player[]> deletePlayers() {
		Player player1 = Player1;
		Player player2 = Player2;
						
		Player1 = null;
		Player2 = null;
		
		Player players[] = new Player[2]; 
		players[0]=player1;
		players[1]=player2;

		if (players != null) {
			return new ResponseEntity<>(players, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Guarda el número de victorias de ambos jugadores en un fichero de texto.
	 * @throws IOException
	 */
	void saveVictories() throws IOException{
		File file = new File("src/main/resources/Victories.txt");
		
		if (file.createNewFile())
		{
		    System.out.println("File is created!");
		} else {
		    System.out.println("File already exists.");
		}
		
		PrintStream writer = new PrintStream(file);
		writer.println(victoriesOchreNinjas);
		writer.println(victoriesPurpleNinjas);
		writer.close();
	}
	
	/**
	 * Guarda el número de saltos de ambos jugadores en un fichero de texto.
	 * @throws IOException
	 */
	void saveStats() throws IOException{	
		
		
		PrintStream writer = new PrintStream(file);
		
		writer.println(jumpedLogs1);
		writer.println(jumpedLogs2);
		
		writer.close();
		
	}
	
	/**
	 * Lee el número de saltos de ambos jugadores de un fichero de texto.
	 * @throws IOException
	 */
	void loadStats() throws IOException{
		if(file.exists()) {
			BufferedReader br = new BufferedReader(new FileReader(file)); 

			jumpedLogs1 = Integer.parseInt(br.readLine());
			jumpedLogs2 = Integer.parseInt(br.readLine());
			
			br.close();
		}
		
	}
	
	/**
	 * Lee el número de victorias de ambos jugadores de un fichero de texto.
	 * @throws IOException
	 */
	void loadVictories() throws IOException{
		  File file = new File("src/main/resources/Victories.txt");
		  BufferedReader br = new BufferedReader(new FileReader(file)); 
		  
		  victoriesOchreNinjas = Integer.parseInt(br.readLine());
		  victoriesPurpleNinjas = Integer.parseInt(br.readLine());
		  br.close();
	}
	
	/**
	 * Hace que la funcion a la que está adjunta se ejecute cada 1000 milisegundos.
	 */
	@Scheduled(fixedDelay = 1000)
	void updateTimers() {
		if(Player1 != null)
			timer1--;
		if(Player2 != null)
			timer2--;
		
		if(timer1<=0) {
			playerReady[0] = false;
			Player1=null;
		}
			
		
		if(timer2<=0) {
			playerReady[1] = false;
			Player2=null;
		}
			
		
		if(Player1 == null) {
			timer1 = 10;
		}
		
		if(Player2 == null) {
			timer2 = 10;
		}
	}	
	
	@GetMapping("/setToDefault")
	void resetData() {
		 Player1 = null;
		 Player2 = null;
		 player1Exists = false;
		 player2Exists = false;
		 playerReady[0] = false;
		 playerReady[1] = false;
		 gameReady = false;
		 gameStarted = false;
		
		 line1 = "";
		 line2 = "";
		 line3 = "";
	}
	
}
