// fetch GET

const fetchAll = (dataType) => {
	return fetch(`http://localhost:3001/api/v1/${dataType}`)
			.then(response => response.json())
			.catch(error => console.log(error));
}

// fetch POST
const postData = (url, newData) => {
	console.log(newData)
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error(`return status: ${JSON.stringify(response.json())}`);
    } else {
			return response.json()
    }
  });
}

export { fetchAll, postData }