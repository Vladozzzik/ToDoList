const title = document.getElementById('title')
const content = document.getElementById('content')
const input = document.getElementById('input')
const storage = JSON.parse(localStorage.getItem('todoList'))

class TodoList {
   constructor() {
      this.todoListArray = []
      this.saveTodoListArray = []

   }
   getListFromMemory(){
      this.todoListArray = storage
      this.renderList()
   }

   addItemToList() {
      this.todoListArray.push({
         id: new Date().getMilliseconds(),
         value: input.value,
         isEdit: false,
         created: Date()
      })
      input.value = ''
      this.saveTodoListArray = this.todoListArray
      this.renderList()
   }
   removeItem(e) {
      const id = Number(e.target.dataset.id)
      this.todoListArray = this.todoListArray.filter((item) =>{
         return id !== item.id
      })
      this. renderList()
   }

   editItem(e) {
      const id = Number(e.target.dataset.id)
      const liContainer = document.getElementById(`${id}`)
      const spanText = liContainer.querySelector('.item-text')
      const checkIcon = liContainer.querySelector('.fa-check')
      const editIcon = liContainer.querySelector('.fa-pen-to-square')
      spanText.contentEditable = 'true'
      checkIcon.classList.remove('hide')
      editIcon.classList.add('hide')
   }
   saveItem(e){
      const id = Number(e.target.dataset.id)
      const liContainer = document.getElementById(`${id}`)
      console.log(liContainer)
      const spanText = liContainer.querySelector('.item-text').innerText
      this.todoListArray = this.todoListArray.map((item) =>{
         return item.id === id ? {...item, value: spanText} : item
      })
      this.renderList()
   }
   
   renderList() {
      content.innerHTML = `${
         this.todoListArray.map((item) => `<li id="${item.id}" class="list-item">
            <span class="item-text" contenteditable="false">${item.value}</span> 
            <span class="item-action">
               <i class="fa-solid fa-check hide" data-id="${item.id}" onclick="todoList.saveItem(event)"></i>
               <i class="fa-solid fa-pen-to-square" data-id="${item.id}" onclick="todoList.editItem(event)"></i> 
               <i class="fa-solid fa-xmark" data-id="${item.id}" onclick="todoList.removeItem(event)"></i>
            </span>
            </li>`).join('')
      }`
   }




   saveToMemory(){
      localStorage.setItem('todoList' , JSON.stringify(this.todoListArray))
      
   }

   searchItems(){
      let search = document.getElementById('search').value.trim()
      if(!search.length){
         this.todoListArray = this.saveTodoListArray
      }
      else{
         this.todoListArray = this.saveTodoListArray.filter((item) =>{
            const val = item.value.toLowerCase()
            search = search.toLowerCase()
            return (val).indexOf(search) !== -1
         })
         console.log(this.todoListArray)
      }

      this.renderList()
   }

   sortItemsName(val){
      if(val === 'acs'){
         this.todoListArray = this.todoListArray.sort((a , b) =>{
            const currVal = a.value
            const nextVal = b.value
            return currVal.localeCompare(nextVal)
            
         })
      }
      else{
         this.todoListArray = this.todoListArray.sort((a , b) =>{
            const currVal = a.value
            const nextVal = b.value
            return nextVal.localeCompare(currVal)
         })

      }
      this.renderList()
   }
   sortItemsDate(val){
      if(val === 'old'){
         this.todoListArray = this.todoListArray.sort((a , b) =>{
            const currDate = a.created
            const nextDate = b.created
            return currDate.localeCompare(nextDate)
         })
      }
      if(val === 'new'){
         this.todoListArray = this.todoListArray.sort((a , b) =>{
            const currDate = a.created
            const nextDate = b.created
            return nextDate.localeCompare(currDate)
         })
      }
      this.renderList()
      
   }

   submitForm(){

   }
}
const todoList = new TodoList()
if(storage) todoList.getListFromMemory()