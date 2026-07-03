async function add(){
  const API = "https://d62a83b2.tb2b-9di.pages.dev";
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name: document.getElementById("name").value,
      description: document.getElementById("desc").value,
      price: document.getElementById("price").value,
      image: document.getElementById("image").value,
      category: document.getElementById("cat").value
    })
  });

  load();
}