import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Popover, Select } from 'antd';
import './style.css';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const pokemonList = [];
  const newPoke = [];

function AddPokemon() {
    const content = () => {
        const onFinish = (values) => {
          const newPokemon = {
            name: values.name,
            url: values.url
          }
          pokemonList.push(newPokemon)
          console.log(newPokemon)
          console.log('Success:', values);
          fetch(newPokemon.url)
              .then(response => response.json())
              .then((pokemonData) => {
              console.log(pokemonData)
              newPoke.push(pokemonData);
              })
            .catch((error) => {
            console.error(error)
          })
        };
        
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

        return (
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Pokemon Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input Pokemon Name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Pokemon Url"
              name="url"
              rules={[
                {
                  required: true,
                  message: 'Please input Pokemon Url!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                Add
              </Button>
            </Form.Item>
          </Form>
        );
      };
    return (
        <div>
            <Popover content={content} title="Title" trigger="click">
                <Button>Add Pokemon</Button>
            </Popover>
        </div>
    );
}

export default AddPokemon;
