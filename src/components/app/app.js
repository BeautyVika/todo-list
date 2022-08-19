import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import TodoList from '../todo-list/todo-list';
import AddFormItem from '../add-form-item/add-form-item';

import './app.css'

export default class App extends Component {

    maxId = 100
    state={
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Todo React'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    }
    createTodoItem (label){
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
           }
    }
    onDeleted =(id)=>{
        this.setState(({todoData})=>{
            const idx = todoData.findIndex((el) => el.id === id)
            const newArr = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx +1)
            ]
            return{
                todoData: newArr
            }
        })
    }
    onAddItem =(text)=>{
       const newItem = this.createTodoItem(text)
       this.setState(({todoData})=>{
        const newArr = [ ...todoData, newItem]
        return {
            todoData: newArr
        }
       })
    }
    onToggleDone =(id)=>{
       this.setState(({todoData})=>{
         const idx = todoData.findIndex((el) => el.id === id)
         const oldItem = todoData[idx]
         const newItem ={...oldItem, done: !oldItem.done}
         const newArr = [
            ...todoData.slice(0, idx), newItem,
            ...todoData.slice(idx +1)
        ]
        return {
            todoData: newArr
        }
       })
    }
    onToggleImportant =(id)=>{
        this.setState(({todoData})=>{
            const idx = todoData.findIndex((el)=> el.id === id)
            const oldItem=todoData[idx]
            const newItem = {...oldItem, important: !oldItem.important}
            const newArr = [
                ...todoData.slice(0, idx), newItem,
                ...todoData.slice(idx+1)
            ]
            return {
                todoData: newArr
            }
        })
    }

    search (items, term){
        if (term.length === 0){
            return items
        }
       return  items.filter((item)=>{
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }
    onSearchChange=(term)=>{
        this.setState({term})
    }
    filter (items, filter){
        switch (filter){
            case 'all':
                return items
            case 'active':
                return items.filter((item)=> !item.done)
            case 'done':
                return items.filter((item)=> item.done)
            default:
                return items
        }
    }
    onFilterChange =(filter)=>{
        this.setState({filter})
    }

    render(){
        
        const {todoData, term, filter} = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const doneCount = todoData.filter((el)=> el.done).length
        const todoCount = todoData.filter((el)=> !el.done).length
        return (
            <div className='app'>
                <AppHeader todo={todoCount} done={doneCount}/>
                <div className='search d-flex'>
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems}
                          onDeleted={this.onDeleted}
                          onToggleDone={this.onToggleDone}
                          onToggleImportant={this.onToggleImportant}/>
                <AddFormItem onAddItem={this.onAddItem}/>
            </div>
            )
    }
} 
