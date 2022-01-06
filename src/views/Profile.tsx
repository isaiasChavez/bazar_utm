import {
  PageHeader,
  Button,
  Typography,
  Space,
  Col,
  Row,
  Divider,
} from "antd";
import { EditFilled, LogoutOutlined } from "@ant-design/icons";
import {  useNavigate } from "react-router-dom";
import { CardPublication } from "../components/CardPublication";
import { useContext, useEffect, useState } from "react";
import EditUserModal from "../components/Profile/EditUserModal";
import UserContext from "../context/user/user.context";
import ProductsContext from "../context/products/products.context";
import SesionContext from "../context/sesion/sesion.context";
import { ROUTES } from "../Router";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const navigate = useNavigate();
  const { getPublicationsUser, loading, publicationsUser } =
    useContext(ProductsContext);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(UserContext);
  const {logout} = useContext(SesionContext);

  useEffect(() => {
    getPublicationsUser();
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const onLogout=()=>{
    logout()
    navigate(ROUTES.root)
  }
  return (
    <>
      <EditUserModal visible={visible} setVisible={setVisible} />
      <div className='h-screen w-full  flex flex-col'>
        <PageHeader
          ghost={false}
          title='Ocupath'
          className='shadow  '
          backIcon={null}
          extra={[
            <Button
              onClick={() => navigate("/newpublication")}
              type='primary'
              key='3'
            >
              Nueva Publicación
            </Button>,
          ]}
        ></PageHeader>
        <div className='flex-1  relative'>
          <div className=' absolute inset-0  flex'>
            {/* Sider */}
            <div className='w-2/12 h-full  lex flex-col align-center shadow'>
              <div className=' h-8/12 w-full flex align-center'>
                <Space direction='vertical' align='center'>
                  <ImageProfile image='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp' />

                  <div className='px-8'>
                    <Space direction='vertical'>
                      <Typography.Title level={2}>
                        {user.name} {user.lastname}
                      </Typography.Title>
                      <Typography.Text>{user.email}</Typography.Text>
                      <Typography.Text>@instagram</Typography.Text>
                      <Typography.Text>@telegram</Typography.Text>
                      <Typography.Text>{user.phonenumber}</Typography.Text>
                      <Button
                        onClick={showModal}
                        icon={<EditFilled />}
                        className='w-full '
                        type='text'
                      >
                        Editar perfil
                      </Button>
                    </Space>
                  </div>
                </Space>
              </div>
              <div className='h-4/12 w-full flex align-end mb-8'>
                <Button
                  icon={<LogoutOutlined />}
                  className='w-full '
                  type='text'
                  onClick={onLogout}
                >
                  Cerrar sesion
                </Button>
              </div>
            </div>
            {/* Sider */}
            <div className='w-10/12 h-full p-16'>
              <div className='h-2/12 w-full '>
                <Typography.Title level={2}>Tus publicaciones</Typography.Title>
              </div>
              <Row gutter={16}>
                {publicationsUser.map((publication, i: number) => {
                  if (i % 3 === 0) {
                    return (
                      < >
                        <Divider key={i} />
                        <Col span={6}>
                          <CardPublication  publication={publication} />
                        </Col>
                      </>
                    );
                  }
                  return (
                    <Col key={i} span={6}>
                      <CardPublication  publication={publication}/>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ImageProfile = ({ image }) => {
  return (
    <div
      style={{
        width: "10rem",
        height: "10rem",
      }}
      className='flex align-center overflow-hidden'
    >
      <img
        style={{
          width: "100%",
        }}
        src={image}
        alt=''
      />
    </div>
  );
};

export default Profile;
