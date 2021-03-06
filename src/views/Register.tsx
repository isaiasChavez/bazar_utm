import { Card, DatePicker, message, PageHeader } from "antd";
import { Form, Input, Select, Button, Checkbox } from "antd";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../src/context/user/user.context";
import { HTTPResponses } from "../types";
import moment from 'moment';
import HeaderCustom from "../components/Header";
import { CreateUserDTO } from "../context/user/user.dto";
import { ROUTES } from "../Router";
import { IMG } from "../utils/assets";
import { verifyEmail } from "../utils/utils";

export interface RegisterProps {}
const { Option } = Select;

const Register: React.FC<RegisterProps> = () => {
  const { loading, createUser } = useContext(UserContext);
  const navigate = useNavigate();

  const male = "male";
  const female = "female";
  const dateFormat = 'YYYY/MM/DD';
  const onFinish = async (values: any) => {
    values.birthday = values.birthday.format("L");
    values.phonenumber = parseInt(values.phonenumber);
    values.gender = values.gender === male ? true : false;

    const dto = new CreateUserDTO(values);

    console.log({ dto });

    const response = await createUser(dto);
    if (
      response.status === HTTPResponses.Ok ||
      response.status === HTTPResponses.OkCreated
    ) {
      message.success("Usuario creado correctamente");
      navigate(ROUTES.login, { replace: true });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${IMG.alumno3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",

        }}
        className=' absolute inset-0  flex flex-col justify-end align-center '
      >
        <div className='w-full bg-white'>
          <PageHeader
            className='bg-black bg-white'
            onBack={() => {
              navigate(ROUTES.root)
            }}
            title='Registro'
          />
        </div>
        <div className='w-full flex-1  flex overflow-y-auto justify-end align-center'>
          <Card style={{
            border:0,
            borderRadius:0,
          }} className='w-3/12 shadow-lg h-full overflow-y-auto'>
            <Form
              name='basic'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
              layout='vertical'
            >
              <Form.Item
                wrapperCol={{ span: 24 }}
                name='name'
                label='Nombre'
                rules={[
                  {
                    required: true,
                    message: "Ingrese un nombre",
                  },
                ]}
              >
                <Input autoFocus/>
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 24 }}
                name='lastname'
                label='Apellidos'
                rules={[
                  {
                    required: true,
                    message: "Ingrese sus apellidos",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 24 }}
                name='email'
                label='Email'
                rules={[
                  {
                    type: "email",
                    message: "Ingrese un email v??lido",
                  },
                  {
                    required: true,
                    message: "Ingrese un email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 24 }}
                name='nickname'
                label='Nickname'
                tooltip='??C??mo quieres que los dem??s te vean?'
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa un nickname",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 24 }}
                name='birthday'
                label='Fecha de nacimiento'
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa un nickname",
                  },
                ]}
              >
                <DatePicker className='w-full' defaultValue={moment('2000/01/01', dateFormat)} showToday={false} />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
                name='phonenumber'
                label='N??mero de tel??fono'
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su n??mero de tel??fono",
                  },
                  {
                    len: 10,
                    message: "N??mero de 10 d??gitos",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
                name='gender'
                label='G??nero'
                rules={[
                  { required: true, message: "Por favor seleccione un g??nero" },
                ]}
              >
                <Select placeholder='Selecciona'>
                  <Option value={male}>Hombre</Option>
                  <Option value={female}>Mujer</Option>
                </Select>
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
                name='password'
                label='Contrase??a'

                
                rules={[
                  
                  {
                    min: 8,
                    message: "Se necesita un m??nimo de 8 caracteres",
                  },
                  {
                    max: 50,
                    message: "M??ximo 50 caracteres",
                  },
                  {
                    required: true,
                    message: "??Por favor ingresa una contrase??a!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                name='confirm'
                label='Confirma tu contrase??a'
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    min: 8,
                    message: "Se necesita un m??nimo de 8 caracteres",
                  },
                  {
                    max: 50,
                    message: "M??ximo 50 caracteres",
                  },
                 
                  {
                    required: true,
                    message: "Por favor confirma tu contrase??a",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("??Las contrase??as no coinciden!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  loading={loading}
                  className='w-full'
                  type='primary'
                  htmlType='submit'
                >
                  Registrarme
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export interface HeaderLandingProps {}

export default Register;
