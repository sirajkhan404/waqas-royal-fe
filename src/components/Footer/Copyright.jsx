import { Col, Row, Typography } from 'antd'
import { HeartFilled } from '@ant-design/icons'

const { Paragraph } = Typography

const Copyright = () => {
    const year = new Date().getFullYear()
    return (
        <footer className='bg-primary py-2'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Paragraph className='text-center text-white mb-0'>&copy; {year}. All Rights Reserved. Made with <HeartFilled style={{ color: '#ef4444', margin: '0 4px' }} /></Paragraph>
                    </Col>
                </Row>
            </div>

        </footer>
    )
}

export default Copyright