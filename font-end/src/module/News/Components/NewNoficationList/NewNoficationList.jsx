import { List } from 'antd';
import React from 'react';

const NewNoficationList = ({notifications}) => {
    return (
        <div className="new-nofication-list-container">
                    <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                // avatar={<Avatar src="" />}
                title={<div>{item.title}</div>}
                description={item.content}                />
            </List.Item>
            )}
        />
        </div>
    );
}

export default NewNoficationList;
