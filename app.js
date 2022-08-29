window.addEventListener("load", () => {
  todo = JSON.parse(localStorage.getItem("todo")) || [];

  let todoFrom = document.querySelector("#todoform");

  todoFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputdata = document.querySelector("#inputbox");
    inputdata.focus();
    if (inputdata.value === "") {
      alert("Input field can`t empty");
    } else {
      let todos = {
        data: inputdata.value,
        status: false,
      };
      todo.push(todos);
      localStorage.setItem("todo", JSON.stringify(todo));
      e.target.reset();
      displaytodo();
    }
  });
  displaytodo();
});

const displaytodo = () => {
  let todoItem = document.querySelector("#todolist");
  let html = "";

  todo.forEach((item, index) => {
    if (item.status == true) {
      compValue = `<td class='completed'>${item.data}</td>`;
    } else {
      compValue = `<td>${item.data}</td>`;
    }

    html += `<tr class='row'>
                        <th>${index + 1}</th>
                        ${compValue}
                        <td><input type='button' value='Edit' onclick="editTask(${index})"></td>
                        <td><input type='button' value='Completed' id='${index}' class="comBtn"></td>
                        <td><input type='button' value='Delete' onclick = "delTask(${index})"></td>
                    </tr>`;
  });
  todoItem.innerHTML = html;
};

const editTask = (index) => {
  let saveIndex = document.querySelector("#saveindex");
  let saveTskbtn = document.querySelector("#savetask");
  saveIndex.value = index;
  saveTskbtn.style.display = "block";
  let inputdata = document.querySelector("#inputbox");
  let todo = JSON.parse(localStorage.getItem("todo"));

  inputdata.value = todo[index]["data"];
};

let inputdata = document.querySelector("#inputbox");
let saveIndex = document.querySelector("#saveindex");
let saveTskbtn = document.querySelector("#savetask");
saveTskbtn.addEventListener("click", () => {
  for (key in todo[saveIndex.value]) {
    if (key == "data") {
      todo[saveIndex.value].data = inputdata.value;
      localStorage.setItem("todo", JSON.stringify(todo));
      displaytodo();
      saveTskbtn.style.display = "none";
      inputdata.value = "";
    }
  }
});

const delTask = (index) => {
  todo.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todo));
  displaytodo();
};

// const completed = (e) => {
//   let comBtn = document.querySelector(".comBtn");
//   console.log(comBtn);
//   todo[e] = `<span style="text-decoration:line-through">' + todo[index] + '</span>';`;
// };

let addedTask = document.querySelector('#todolist');
 addedTask.addEventListener('click',(e)=> {
    let myTarget = e.target;
    let myTargetId = myTarget.getAttribute('id');
    console.log(myTargetId);
    let todo = JSON.parse(localStorage.getItem('todo'));
    mytargetpresibling = myTarget.parentElement.previousElementSibling.previousElementSibling;

    for( keys in todo[myTargetId])
      {
        for (keys in todo[myTargetId]) {
          if(keys == 'status' && todo[myTargetId][keys]==true){
              todo[myTargetId].status =  false;
              
             // taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':false};
          }else if(keys == 'status' && todo[myTargetId][keys]==false){
              todo[myTargetId].status = true;
              //taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':true};
          }
          localStorage.setItem('todo',JSON.stringify(todo))
        }

      }
  })

//   let searchtextbox = document.getElementById("searchbox");
// searchtextbox.addEventListener("input", function(){
//     let trlist = document.querySelectorAll("tr");
//     Array.from(trlist).forEach(function(item){
//         let searchedtext = item.getElementsByTagName("td")[0].innerText;
//         let searchtextboxval = searchtextbox.value;
//         let re = new RegExp(searchtextboxval, 'gi');
//         if(searchedtext.match(re)){
//             item.style.display="block";
//         }
//         else{
//             item.style.display="none";
//         }
//     })
// })

let searchBox = document.querySelector('#searchbox');
searchBox.addEventListener('input',() => {
  let trlist = document.querySelectorAll('tr');
  Array.from(trlist).forEach((item) => {
    let searchedtext = item.getElementsByTagName('td')[0].innerText;
    let serValue = searchBox.value
    let re = new RegExp(serValue,'gi');
    if(searchedtext.match(re)) {
      item.style.display  ='block'
    }
    else
    {
      item.style.display = 'none';
    }
  })
})