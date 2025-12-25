const form = document.getElementById("join_form");
const getBmiForm = document.getElementById("get_bmi_form");
const responseDiv = document.getElementById("response");
const bmiResponseDiv = document.getElementById("bmi_response");

getBmiForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const full_name = document.getElementById("get_bmi_full_name").value;
  console.log("full name in client", full_name);
  try {
    const res = await fetch("/getBmi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name }),
    });

    const data = await res.json();
    const { student_name, bmi, bmi_category } = data;
    if (res.ok) {
      bmiResponseDiv.innerHTML = `<p style="color:green;">Name: ${student_name}<br/> BMI: ${bmi}<br/> Category: ${bmi_category}</p>`;
      form.reset();
    } else {
      bmiResponseDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
    }
  } catch (error) {
    bmiResponseDiv.innerHTML = `<p style="color:red;">Student not found</p>`;
    console.error(error);
  }
});

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
