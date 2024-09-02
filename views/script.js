document
  .getElementById("student-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const lname = document.getElementById("lname").value;
    const muni = document.getElementById("muni").value;
    const dept = document.getElementById("dept").value;
    const bar = document.getElementById("bar").value;
    const secc = document.getElementById("secc").value;
    const jorn = document.getElementById("jorn").value;

    fetch("/save-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        grade,
        lname,
        muni,
        dept,
        bar,
        secc,
        jorn,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          addStudentToList(data.student);
          document.getElementById("student-form").reset();
        } else {
          console.error("Error:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function addStudentToList(student) {
  const studentList = document.getElementById("student-list");
  const listItem = document.createElement("li");
  listItem.textContent = `Nombre: ${student.name}, Apellido: ${student.lname}, Municipio: ${student.muni}, Departamento: ${student.dept}, Barrio: ${student.bar}, Edad: ${student.age}, Grado: ${student.grade}, Sección: ${student.secc}, Jornada: ${student.jorn}`;
  studentList.appendChild(listItem);
}
