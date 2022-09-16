export async function query(url, method, body) {
  let httpStatusError = false;
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(body && { body: JSON.stringify(body) }),
    });
    const newWilder = await response.json();
    if (!response.ok) {
      httpStatusError = true;
      throw Error(await response.json());
    }
    return newWilder;
  } catch (error) {
    if (httpStatusError) {
      throw Error(error.message);
    }
    throw Error(
      "Impossible de joindre le serveur. Vérifiez votre connexion à Internet."
    );
  }
}
