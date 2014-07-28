/**
 * 
 */
package com.vps._return;

import java.io.Serializable;

public class KV implements Serializable {

	private static final long serialVersionUID = -4136438626460037416L;

	// ----------------------------------------------------------- Constructors

	/**
	 * Default constructor.
	 * 
	 */
	public KV() {
		this(null, null);
	}

	/**
	 * Constructor.
	 * 
	 * @param name
	 *            The name.
	 * @param value
	 *            The value.
	 */
	public KV(String name, Object value) {
		this.name = name;
		this.value = value;
	}

	// ----------------------------------------------------- Instance Variables

	/**
	 * Name.
	 */
	private String name = null;

	/**
	 * Value.
	 */
	private Object value = null;

	// ------------------------------------------------------------- Properties

	/**
	 * Set the name.
	 * 
	 * @param name
	 *            The new name
	 * @see #getName()
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Return the name.
	 * 
	 * @return String name The name
	 * @see #setName(String)
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set the value.
	 * 
	 * @param value
	 *            The new value.
	 */
	public void setValue(Object value) {
		this.value = value;
	}

	/**
	 * Return the current value.
	 * 
	 * @return String value The current value.
	 */
	public Object getValue() {
		return value;
	}

	// --------------------------------------------------------- Public Methods

	/**
	 * Get a String representation of this pair.
	 * 
	 * @return A string representation.
	 */
	public String toString() {
		return ("name=" + name + ", " + "value=" + value);
	}

	public boolean equals(final Object object) {
		if (object == null)
			return false;
		if (this == object)
			return true;
		if (object instanceof KV) {
			KV that = (KV) object;
			return LangUtils.equals(this.name, that.name) && LangUtils.equals(this.value, that.value);
		} else {
			return false;
		}
	}

	public int hashCode() {
		int hash = LangUtils.HASH_SEED;
		hash = LangUtils.hashCode(hash, this.name);
		hash = LangUtils.hashCode(hash, this.value);
		return hash;
	}
}
