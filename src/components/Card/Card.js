import React from 'react';
import typeColors from '../../helpers/typeColors'
import './style.css';
import 'antd/dist/antd.css';
import { Popover, Button} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Progress } from 'antd';

function Card ({ pokemon }) {
    const content = (
        <div className="popCard">
            <div>
                {
                    pokemon.types.map(type => {
                        return (
                            <div className="Card__type" style={{ backgroundColor: typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="popInfo">
                <div>
                    <p className="title">Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div>
                    <p className="title">Height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div>
                    {
                        pokemon.stats.map(stat => {
                            return (
                                <div>
                                    <Tag color="green">
                                        {stat.stat.name.toUpperCase()}
                                    </Tag>
                                    <br />
                                    <Progress percent={stat.base_stat} />
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <div>
                    <p className="title">Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
            <div>
                <Button>
                    Delete
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
      );
    return (
        <div className="Card">
            <Popover placement="bottom" content={content} trigger="click">
            <div>
                <div className="Card__img">
                    <img src={pokemon.sprites.front_default} alt="" />
                </div>
                <div className="Card__name">
                    {pokemon.name}
                </div>
            </div>
            </Popover>
        </div>
    );
}

export default Card;
