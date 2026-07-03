async function add(){
  await fetch(API,{
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