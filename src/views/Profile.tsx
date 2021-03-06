import {
  PageHeader,
  Button,
  Typography,
  Space,
  Col,
  Row,
  Divider,
  List,
  Empty,
} from "antd";
import {
  AppstoreOutlined,
  EditFilled,
  InboxOutlined,
  InstagramOutlined,
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
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
  const { getPublicationsUser, loading, publicationsUser,clearPublications } =
    useContext(ProductsContext);
  const [visible, setVisible] = useState(false);
  const { user, getUserProfile,clear } = useContext(UserContext);
  const { logout } = useContext(SesionContext);

  useEffect(() => {
    getPublicationsUser();
    getUserProfile(true);
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const onLogout = () => {
    logout();
    clear()
    clearPublications()

    navigate(ROUTES.root);
  };
  return (
    <>
      <EditUserModal visible={visible} setVisible={setVisible} />

      <div className='h-screen w-full  flex flex-col'>
        <PageHeader
          ghost={false}
          title={
            <span
              className='cursor-pointer'
              onClick={() => navigate(ROUTES.root)}
            >
              Bazar UTM
            </span>
          }
          className='shadow  '
          backIcon={null}
          extra={[
            <Button
              onClick={() => navigate(ROUTES.store)}
              type='default'
              icon={<AppstoreOutlined />}
              key='3'
            >
              Tienda
            </Button>,
            <Button
              onClick={() => navigate(ROUTES.newPublication)}
              type='primary'
              icon={<PlusSquareOutlined />}
              key='3'
            >
              Nueva Publicaci??n
            </Button>,
          ]}
        ></PageHeader>
        <div className='flex-1  relative'>
          <div className=' absolute inset-0   flex'>
            {/* Sider */}
            <div className='w-2/12      flex-col align-center shadow'>
              <div className=' h-8/12 w-full  flex align-center'>
                <Space direction='vertical' className=' w-full' align='center'>
                  <div onClick={showModal} className="cursor-pointer">

                  <ImageProfile  image={user.avatar} />
                  </div>

                  <div className=' w-full px-8 '>
                    <Space direction='vertical' className=' '>
                      <Typography.Title level={3}>
                        {user.name} {user.lastname}
                      </Typography.Title>

                      <List
                        itemLayout='horizontal'
                        dataSource={[
                          {
                            name: (
                              <Space>
                                <MailOutlined />
                                {user.email}
                              </Space>
                            ),
                          },
                          {
                            name: (
                              <Space>
                                <PhoneOutlined />
                                {user.phonenumber}
                              </Space>
                            ),
                          },
                          {
                            name: user.instagram ? (
                              <Space>
                                <InstagramOutlined />
                                {user.instagram}
                              </Space>
                            ) : (
                              <Button
                                onClick={showModal}
                                icon={<InstagramOutlined />}
                                type='link'
                              >
                                Agrega tu instagram
                              </Button>
                            ),
                          },
                          {
                            name: user.telegram ? (
                              <Space>
                                <InboxOutlined />
                                {user.telegram}
                              </Space>
                            ) : (
                              <Button
                                onClick={showModal}
                                icon={<EditFilled />}
                                type='link'
                              >
                                Agrega tu telegram
                              </Button>
                            ),
                          },
                        ]}
                        renderItem={item => (
                          <List.Item>
                            <List.Item.Meta title={item.name} />
                          </List.Item>
                        )}
                      />
                      <Button
                        onClick={showModal}
                        icon={<EditFilled />}
                        className='w-full '
                        type='primary'
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
            <div className='w-10/12  h-full p-8 overflow-y-auto flex flex-col'>
              <div className='h-1/12 w-full  '>
                <Typography.Title level={2}>Tus publicaciones</Typography.Title>
              </div>
              <Row gutter={16}>
                {publicationsUser.map((publication, i: number) => {
                  if (i % 4 === 0 && i !== 0) {
                    return (
                      <>
                        <Divider key={i} />
                        <Col span={6}>
                          <CardPublication publication={publication} />
                        </Col>
                      </>
                    );
                  }
                  return (
                    <Col key={i} span={6}>
                      <CardPublication publication={publication} />
                    </Col>
                  );
                })}
              </Row>
              {publicationsUser.length === 0 ? (
                <div className='flex-1 flex justify-center align-center'>
                  <Empty
                    description={
                      <>
                        No tienes publicaciones, empieza{" "}
                        <Link to={ROUTES.newPublication}>creando una</Link>
                      </>
                    }
                  />
                </div>
              ) : null}
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
