import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import uuid from 'uuid'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
};
const ItemSortCriteria = {
  SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
  SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
  SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
  SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
  SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
  SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};


class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItemSortCriteria: ItemSortCriteria.SORT_BY_TASK_INCREASING,
    todoItem: null
  }


  sortCurrentList = (value) => {


    // console.log(value);
    // this.setState({ currentItemSortCriteria: value })


    this.sortTasks(value)

  }


  sortTasks = (sortingCriteria) => {
    this.setState({ currentItemSortCriteria: sortingCriteria })
    // console.log(this.state.currentItemSortCriteria)
    const newLists = [...this.state.todoLists.map(current => {
      if (current === this.state.currentList)
        current.items.sort(this.compare);






      return current
    })]
    this.setState({ todoLists: newLists })
    // this.setState({
    //   currentList: this.state.todoLists.find(e => {
    //     return e.key === this.state.currentList.key
    //   })
    // })

  }

  isCurrentItemSortCriteria = (testCriteria) => {
    // console.log(testCriteria)
    // console.log(this.state.currentItemSortCriteria + "currenatkelsjfdkljgaf")
    return this.state.currentItemSortCriteria === testCriteria;
  }
  compare = (item1, item2) => {
    // console.log(item1, item2)
    // let thisModel = window.todo.model;

    // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
    if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
      || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)
      || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)) {
      let temp = item1;
      item1 = item2;
      item2 = temp;
    }
    // SORT BY ITEM DESCRIPTION
    if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
      || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
      if (item1.description < item2.description)
        return -1;
      else if (item1.description > item2.description)
        return 1;
      else
        return 0;
    }
    // SORT BY DUE DATE
    else if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
      || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
      let dueDate1 = item1.due_date;
      let dueDate2 = item2.due_date;
      let date1 = new Date(dueDate1);
      let date2 = new Date(dueDate2);
      if (date1 < date2)
        return -1;
      else if (date1 > date2)
        return 1;
      else
        return 0;
    }
    // SORT BY COMPLETED
    else {
      if (item1.completed < item2.completed)
        return -1;
      else if (item1.completed > item2.completed)
        return 1;
      else
        return 0;
    }
  }





  goHome = () => {
    this.setState({ currentScreen: AppScreen.HOME_SCREEN });
    this.setState({ currentList: null });
  }

  loadList = (todoListToLoad) => {
    this.setState({ currentScreen: AppScreen.LIST_SCREEN });
    this.setState({ currentList: todoListToLoad });

  }

  NameOwnerOnChange = (typeOfChange, newValue) => {
    // this.setState({current})

    // console.log(newValue);
    const newLists = [...this.state.todoLists.map(current => {
      if (current === this.state.currentList) {
        if (typeOfChange == "name")
          current.name = newValue
        else
          current.owner = newValue



      }

      return current
    })]
    this.setState({ todoLists: newLists })
    // this.setState({
    //   currentList: this.state.todoLists.find(e => {
    //     return e.key === this.state.currentList.key
    //   })
    // })
  }

  deleteList = () => {
    console.log("deleting")
    this.setState(
      {
        todoLists: [...this.state.todoLists.filter(todo => todo !== this.state.currentList)]
      }
    )


    this.goHome()

  }

  moveUp = (e) => {
    console.log(e)

    var index = this.state.currentList.items.findIndex(current => {
      console.log(current, e)
      return current === e
    })
    console.log(index);

    var newList = this.state.currentList
    var temp = newList.items[index - 1]
    newList.items[index - 1] = newList.items[index]
    newList.items[index] = temp



    this.setState({ currentList: newList })





  }

  moveDown = (e) => {
    console.log(e)

    var index = this.state.currentList.items.findIndex(current => {
      console.log(current, e)
      return current === e
    })
    console.log(index);

    var newList = this.state.currentList
    var temp = newList.items[index + 1]
    newList.items[index + 1] = newList.items[index]
    newList.items[index] = temp



    this.setState({ currentList: newList })


  }

  deleteItem = (e) => {
    console.log(e)


    var newList = this.state.currentList

    newList.items = [...newList.items.filter(todo => todo !== e)]


    console.log(newList)




    this.setState({ currentList: newList })


  }


  editItemPage = (e, current) => {

    // console.log(e)
    // console.log(current)
    // console.log(123)
    if (e === "add") {
      var newItem = { assigned_to: null, completed: null, description: null, due_date: null, key: null }
      this.setState({ todoItem: newItem })
    }
    else
      this.setState({ todoItem: current })


    this.setState({ currentScreen: AppScreen.ITEM_SCREEN })
  }


  updateItem = (value) => {

    // console.log("updating item")
    // console.log(value)
    this.setState({ todoItem: value })

    var newList = this.state.currentList
    newList.items = newList.items.map(currentItem => {
      if (currentItem.key == value.key)
        return value
      else
        return currentItem
    })


    this.setState({ currentList: newList })


    this.loadList(this.state.currentList)

  }

  addItem = (value) => {


    var newList = this.state.currentList

    newList.items= [...newList.items,value]


    this.setState({ currentList: newList })


    this.loadList(this.state.currentList)





    console.log("adding item")

  }


  addNewList = ()=>{

    
    // this.loadList(this.state.todoLists[0])

    const newList= {
      key:uuid.v4(),
      name:'Unknown',
      owner:'Unknown',
      items: [],




    }


    console.log(newList)


//async function
    this.setState({currentList:newList},()=>{


      this.setState({todoLists:[...this.state.todoLists,this.state.currentList]})

      this.loadList(this.state.currentList)
      


      // console.log(this.state.currentList)
    })
      
    

    // this.loadList(newList)

    
    // console.log(newList===this.state.currentList)


    // this.loadList(this.state.currentList)


    // console.log("newList bp1");
    // console.log(this.state.todoLists[0]);


    
    // this.setState({todoLists:[...this.state.todoLists,newList]})

    // console.log(newList);

    // console.log("newList bp2");


    // this.setState({currentList:newList})
    // this.loadList(this.state.currentList)



  }

  render() {
    switch (this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen
          loadList={this.loadList.bind(this)}
          todoLists={this.state.todoLists}
          addNewList={this.addNewList}

        />;
      case AppScreen.LIST_SCREEN:
        return <ListScreen
          moveUp={this.moveUp}
          moveDown={this.moveDown}
          deleteItem={this.deleteItem}
          editItem={this.editItemPage}

          sortBy={this.sortCurrentList}
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          nameOnChange={this.NameOwnerOnChange}
          deleteList={this.deleteList}
        />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen todoItem={this.state.todoItem}
          loadList={this.loadList}

          // default_assigned_to={this.state.todoItem.assigned_to}
          //   default_description={this.state.todoItem.description}

          //   default_due_date={this.state.todoItem.due_date}

          //   default_completed={this.state.todoItem.completed}

          state={this.state}


          updateItem={this.updateItem}
          addItem={this.addItem}






        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;