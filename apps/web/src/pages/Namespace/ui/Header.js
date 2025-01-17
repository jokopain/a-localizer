import {  Typography, Divider } from 'antd';
const Header = (props) => {
    const {title = "", total = 0, slug = ""} = props;
    return(
        <>
            <Typography.Title style={{marginBottom: 5}}>
                {title}
            </Typography.Title>
            <Typography.Text type="secondary">
                <Typography.Text type="secondary" strong>Slug</Typography.Text>: {slug}
            </Typography.Text>
            <Typography.Text type="secondary">
                <Typography.Text type="secondary" strong>Total keys</Typography.Text>: {total}
            </Typography.Text>
            <Divider />
        </>
    );
}

export default Header;