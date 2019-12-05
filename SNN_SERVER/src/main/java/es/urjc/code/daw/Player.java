package es.urjc.code.daw;

public class Player {

	private long id = -1;
	private String nickname = "Default_Nickname";

	public Player() {

	}
	/**
	 * Constructor de la clase Player, da el valor del parámetro nickname al atributo nickname.
	 * @param nickname
	 */
	public Player(String nickname) {
		super();
		this.nickname = nickname;
	}
	
	/**
	 * Devuelve el atributo nickname.
	 * @return
	 */
	public String getNickname() {
		return nickname;
	}
	/**
	 * Da el valor del parámetro nickname al atributo nickname.
	 * @param nickname
	 */
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
	/**
	 * Devuelve el valor del atributo id.
	 * @return
	 */
	public long getId() {
		return id;
	}
	
	/**
	 * Da el valor del parámetro id al atributo id.
	 * @param id
	 */
	public void setId(long id) {
		this.id = id;
	}
	
	/**
	 * Devuelve como string los atributos de Player.
	 */
	@Override
	public String toString() {
		return "Anuncio [id=" + id + ",nickname=" + nickname + "]";
	}

}