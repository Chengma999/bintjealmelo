import React from 'react'
import { Form, Select, Button, } from 'antd';
import axios from 'axios'
import moment from 'moment'
const {Option} = Select

const arr=[];
const a=12;
const n=23.75;
const index=(n-a)/0.25
for( let i=0;i<index+1;i++){
  arr.push(a+i*0.25)
}

const AfhaaltijdenForm = props => {

  let {factors} = props
  const [form]=Form.useForm()
  const onFinish = async values => {
    const {data}=await axios.post('/api/admincrud/updateafhaaltijden',values)
    window.location.reload()
  };
  const optionsArr=arr.map(time=>{
    const label =moment((Math.floor(time)*100+(time-Math.floor(time))*60).toString(),'hmm').format("HH:mm")
    return <Option value={time}>{label}</Option>})
    let  {afhaaltijden } = factors
    if(afhaaltijden!==undefined&& afhaaltijden.length>0){
    form.setFieldsValue(
      {begintime:afhaaltijden[0].value,
      endtime:afhaaltijden[afhaaltijden.length-1].value})
  }
  return (
    <div>

    <Form
      name="basic"
      form={form}
      onFinish={onFinish}

    >
      <Form.Item
        name="begintime"
        rules={[
          {
            required: true,
            message: 'Vul beginafhaaltijd in!',
          },
        ]}
      >
        <Select >
        {optionsArr}
        </Select >
      </Form.Item>
      <Form.Item
        name="endtime"
        rules={[
          {
            required: true,
            message: 'Vul eindafhaaltijd in!',
          },({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('begintime') < value) {
                return Promise.resolve();
              }

              return Promise.reject('Eindtijd moet later zijn dan begintijd!');
            },
          }),
        ]}
      >
        <Select >
        {optionsArr}
        </Select >
      </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>

    </Form>
    </div>
  );
};

export default AfhaaltijdenForm
