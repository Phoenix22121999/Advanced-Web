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
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
            )}
        />
        </div>
    );
}

export default NewNoficationList;
