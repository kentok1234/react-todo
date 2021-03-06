import { Card, Row, Col, Checkbox, Empty, Button, Tooltip } from "antd"
import { CloseOutlined } from '@ant-design/icons';
import { useState } from "react"
import './Todo.css'

function Todo(props) {
    const contents = props.dataTodos

    const changeCheck = todo => {
        const newTodos = {...contents}
        
        // const allTodo = newTodos.all.find(all => {
        //   if (all.id === todo.id) all.check = todo.check
        //   return all
        // })
        newTodos.all.map(all => {
          if(all.id === todo.id) {
            all.check = todo.check
            const indexActive = newTodos.active.findIndex(active => active.id === all.id)
            const indexComplete = newTodos.completed.findIndex(completed => completed.id === all.id)
            if(all.check) {
              newTodos.completed.push(all)
              delete newTodos.active[indexActive] 
            }
            newTodos.active.push(all)
            delete newTodos.completed[indexComplete]
          }
        })
    
        const activeTodo = newTodos.active.filter(active => {
          if (active.id === todo.id) {
            active.check = todo.check
          }
          return !active.check
        })
    
        const completedTodo = newTodos.completed.filter(completed => {
          if (completed.id === todo.id) {
            completed.check = todo.check
          }
          return completed.check
        })
    
    
        newTodos.active = activeTodo
        newTodos.completed = completedTodo
    
        console.log(newTodos)
        props.checkTodo(newTodos)
    }

    const tabList = [
        {
          key: "all",
          tab: "All"
        },
        {
          key: "active",
          tab: "Active"
        },
        {
          key: "completed",
          tab: "Completed"
        },
    ]

    const [activeKey, setActiveKey] = useState('all')

    const onTabChange = key => {
      setActiveKey(key)
    }

    const deleteTodo = todo => {
        const newTodos = {...contents}
        for (const key in newTodos) {
            const updateTodos = newTodos[key].filter(arr => arr.id !== todo.id)
            newTodos[key] = updateTodos
        }
        props.checkTodo(newTodos)
    }

    return (
        <Card 
            tabList={tabList}
            activeTabKey={activeKey}
            onTabChange={
            key => {
                onTabChange(key)
            }
            }
        >
            <Row gutter={[0, 8]} justify="center">
                {contents[activeKey].map((content, index) => {
                    return (
                            <Col key={index} className="card__todo" span={24}>
                                <div className="todo__item">
                                    <Checkbox checked={content.check} onChange={(e) => {
                                    content.check = e.target.checked
                                    changeCheck(content)
                                    }} style={{textDecoration: (content.check) ? 'line-through' : 'none'}}>{content.title}</Checkbox>
                                    <Tooltip title="Delete task">
                                        <Button type="primary" size="small" danger icon={<CloseOutlined />} onClick={(e) => deleteTodo(content)}/>
                                    </Tooltip>
                                </div>
                            </Col>
                    )
                })}
                {!contents[activeKey].length > 0 &&
                    <Empty
                        description={
                            <span>There is no task in {activeKey}</span>
                        } 
                    />
                }
            </Row>
        </Card>
    )
}

export default Todo