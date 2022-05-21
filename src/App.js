import { Layout, Row, Col, Form, Input, Button, Card, Checkbox } from 'antd';
import { useState } from 'react';


function App() {
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

  const [contents, setCheckContent] = useState({
    all: [{id: 1, check: false, title: 'Porta ac consectetur ac'}, {id: 2, check: false, title: 'Motorola'}, {id: 3, check: true, title: 'Ramayana'}],
    active: [{id: 1, check: false, title: 'Porta ac consectetur ac'}, {id: 2, check: false, title: 'Motorola'}],
    completed: [{id: 3, check: true, title: 'Ramayana'}]
  })

  const [activeKey, setActiveKey] = useState('all')

  const onTabChange = key => {
    setActiveKey(key)
  }

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
    setCheckContent(newTodos)
  }

  const addTodo = form => {
    const newTodos = {...contents}
    const newTodo = {
      id: Math.max(...contents.all.map(todo => todo.id)) + 1,
      check: false,
      title: form.todo
    }
    newTodos.all.push(newTodo)
    newTodos.active.push(newTodo)
    setCheckContent(newTodos)
  }

  return (
    <Row align='center' justify='center' style={{minHeight: '100vh', backgroundColor: 'ghostwhite'}}>
      <Layout style={{maxWidth: '576px', margin: 'auto',padding: '2em', backgroundColor: 'white', boxShadow: '1em 1em 10px rgba(0, 0, 0, 0.1)', borderRadius: '1em'}}>
        <Form onFinish={addTodo}>
            <Row justify='center' gutter={[8, 8]}>
              <Col span={16}>
                <Form.Item name='todo' rules={[{required: true, message: "Can't add empty task"}]}>
                  <Input placeholder='New task...' />
                </Form.Item>
              </Col>
              <Col>
                <Button type='primary' htmlType='submit'>ADD</Button>
              </Col>
            </Row>
        </Form>

        <Card 
          tabList={tabList}
          activeTabKey={activeKey}
          onTabChange={
            key => {
              onTabChange(key)
            }
          }
        >
          {contents[activeKey].map((content, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Checkbox checked={content.check} onChange={(e) => {
                    content.check = e.target.checked
                    changeCheck(content)
                  }}>{content.title}</Checkbox>
                </Col>
              </Row>
            )
          })}
        </Card>
      </Layout>
    </Row>
  );
}

export default App;
