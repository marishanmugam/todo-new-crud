
window.addEventListener('load',() => {
     todo = JSON.parse(localStorage.getItem('todo')) || [];

    let todoFrom = document.querySelector('#todoform')

    todoFrom.addEventListener('submit',(e) => {
        e.preventDefault();
        let inputdata = document.querySelector('#inputbox');
        inputdata.focus();
        if(inputdata.value === '')
        {
            alert('Input field can`t empty')
        }

        else
        {
            let todos = {
                data : inputdata.value,
                status : false,
            }
            todo.push(todos);
            localStorage.setItem('todo',JSON.stringify(todo));
            e.target.reset();
            displaytodo();
        }
    })
    displaytodo();
})

const displaytodo = () => {
    let todoItem = document.querySelector('#todolist');
    let html ='';
    
    todo.forEach((item,index) => {
        if(item.status == true)
        {
             compValue = `<td class='completed'>${item.data}</td>`
        }
        else
        {
            compValue = `<td>${item.data}</td>`
        }

        html += `<tr class='row'>
                        <th>${index+1}</th>
                        ${compValue}
                        <td><input type='button' value='Edit' onclick="editTask(${index})"></td>
                        <td><input type='button' value='Completed' id='${index}' onclick="completed(${index})"></td>
                        <td><input type='button' value='Delete' onclick = "delTask(${index})"></td>
                    </tr>`
    })
    todoItem.innerHTML = html;
}

const editTask = (index) => {
    let saveIndex = document.querySelector('#saveindex');
    let saveTskbtn = document.querySelector('#savetask');
    saveIndex.value = index;
    saveTskbtn.style.display = 'block';
    let inputdata = document.querySelector('#inputbox');
    let todo = JSON.parse(localStorage.getItem('todo'));
    
    inputdata.value = todo [index]['data'];
       
}

let inputdata = document.querySelector('#inputbox');
let saveIndex = document.querySelector('#saveindex');
let saveTskbtn = document.querySelector('#savetask');
saveTskbtn.addEventListener('click', () => {
    for(key in todo[saveIndex.value])
    {
        if(key == 'data') {
            todo[saveIndex.value].data = inputdata.value;
            localStorage.setItem('todo',JSON.stringify(todo));
            displaytodo();
            saveTskbtn.style.display = 'none';
            inputdata.value='';
        }
    }
})


const delTask = (index) => {
    todo.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(todo));
    displaytodo();
}


const completed = (e) => {
    todo[e] = `<span style="text-decoration:line-through">' + todo[index] + '</span>';`
}