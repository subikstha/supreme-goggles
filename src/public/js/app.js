const form = document.getElementById("join_form");
const responseDiv = document.getElementById("response");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const full_name = document.getElementById("full_name").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;

  try {
    const res = await fetch("/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, weight, height }),
    });

    const data = await res.json();

    if (res.ok) {
      responseDiv.innerHTML = `<p style="color:green;">User Created Successfully!</p>`;
      form.reset();
    } else {
      responseDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
    }
  } catch (err) {
    responseDiv.innerHTML = `<p style="color:red;">Server error</p>`;
    console.error(err);
  }
});
