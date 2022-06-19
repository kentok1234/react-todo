import { Layout, Row, Col, Form, Input, Button } from 'antd';
import Todo from './components/Todo'
import { useState } from 'react';


function App() {

  const [contents, setCheckContent] = useState({
    all: [],
    active: [],
    completed: []
  })

  const addTodo = form => {
    const newTodos = { ...contents }
    const newTodo = {
      id: (contents.all.length > 0) ? Math.max(...contents.all.map(todo => todo.id)) + 1 : 1,
      check: false,
      title: form.todo
    }
    newTodos.all.push(newTodo)
    newTodos.active.push(newTodo)
    setCheckContent(newTodos)
  }

  return (
    <Row align='center' justify='center' style={{ minHeight: '100vh', backgroundColor: 'ghostwhite' }}>
      <Layout style={{ maxWidth: '576px', margin: 'auto', padding: '2em', backgroundColor: 'white', boxShadow: '1em 1em 10px rgba(0, 0, 0, 0.1)', borderRadius: '1em' }}>
        <Form onFinish={addTodo}>
          <Row justify='center' gutter={[8, 8]}>
            <Col span={16}>
              <Form.Item name='todo' rules={[{ required: true, message: "Can't add empty task" }]}>
                <Input placeholder='New task...' />
              </Form.Item>
            </Col>
            <Col>
              <Button type='primary' htmlType='submit'>ADD</Button>
            </Col>
          </Row>
        </Form>

        <Todo dataTodos={contents} checkTodo={setCheckContent} />
      </Layout>
    </Row>
  );
}

export default App;
