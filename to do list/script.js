const button = document.querySelector('.btn-add-task')
const input = document.querySelector('.input-task')
const completeList = document.querySelector('.list-tasks')

let itemList = []


function AddTask() {
    if(input.value.trim() === ''){
        alert('É preciso adicionar uma tarefa!')
        return
    }


    itemList.push({
        task: input.value,
        completed: false
    })

    input.value = ''

    showTask()
}

function showTask() {

    let newLi = ''

    itemList.forEach((item, index) => {

        newLi = newLi + `
                <li class="task ${item.completed && "done"}">
                    <i class="fa-regular fa-circle-check" alt="task-check" id="check" onclick="FinishTask(${index})"></i>
                    <p>${item.task}</p>
                    <i class="fa-solid fa-x" alt="task-trash" id="remove" onclick="RemoveTask(${index})"></i>
                </li>`
    })

    completeList.innerHTML = newLi

    localStorage.setItem('list', JSON.stringify(itemList))

}

function FinishTask(index){
    itemList[index].completed = !itemList[index].completed

    showTask()
}


function RemoveTask(index){
    itemList.splice(index, 1)

    showTask()
}

function ReloadItems(){
    const tasksLocalStorage = localStorage.getItem('list')

    if(tasksLocalStorage){
    itemList = JSON.parse(tasksLocalStorage)
    }

    showTask()
}

ReloadItems()

button.addEventListener('click', AddTask)
