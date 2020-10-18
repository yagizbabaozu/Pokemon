import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { getPokemon, getAllPokemon } from './services/pokemon';
import { Button, Popover, Form, Input } from 'antd';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [myPokemonData, setMyPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [myPokemonEnabled, setmyPokemonEnabled] = useState(false);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }

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

  const delPoke = async () => {
    let arrr = [...myPokemonData];
    arrr.splice(0, 1)
    setMyPokemonData(arrr);
    setmyPokemonEnabled(true);
    if (arrr[0] == undefined) {
      setmyPokemonEnabled(false);
    }
  }

  const content = () => {
    const onFinish = async (values) => {
      const pokemon = {
        name: "",
        url: values.url
      }

      let record = await getPokemon(pokemon);

      let arr = [...myPokemonData];
      arr.push(record)

      setMyPokemonData(arr);
      setmyPokemonEnabled(true);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div>
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
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div>
        <Popover content={content} title="Title" trigger="click">
          <Button type="primary" shape="round">Add Pokemon</Button>
        </Popover>
        <Button onClick={delPoke} style={{ marginLeft: "10px" }}>Delete Pokemon</Button>
      </div>
      <div style={{ display: myPokemonEnabled ? 'block' : 'none' }}>
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            <div className="grid-container">
              {myPokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
          </>
        )}
      </div>
      <div style={{ display: myPokemonEnabled ? 'none' : 'block' }}>
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className="btn">
              <Button onClick={prev}>Previous</Button>
              <Button onClick={next}>Next</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;