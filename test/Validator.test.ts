import validator from '../src/Validator'

const registerInfo = {
  name: '',
  cellNumber: '',

}

test('#isNonEmpty', () => {
  // 校验报名信息
  const getRegisterInfoValidation = () => {
    // 字符串\转义，字符串四斜扛->\\，new RegExp需要一个斜杠转义

    validator.add(registerInfo.name, [{
      strategy: 'isNonEmpty',
      errMsg: '请填写参赛者姓名'
    }, {
      strategy: 'isValidName',
      errMsg: '姓名中有非法字符'
    }])

    let errMsg: any = validator.start()

    return errMsg
  }

  console.log('>>>', getRegisterInfoValidation());
})

test('', () => {
  // 校验报名信息
  const getRegisterInfoValidation = () => {
    // 字符串\转义，字符串四斜扛->\\，new RegExp需要一个斜杠转义

    validator.add(registerInfo.name, [{
      strategy: 'isNonEmpty',
      errMsg: '请填写参赛者姓名'
    }, {
      strategy: 'isValidName',
      errMsg: '姓名中有非法字符'
    }])

    validator.add(registerInfo.cellNumber, [{
      strategy: 'isNonEmpty',
      errMsg: '请填写手机号码'
    }, {
      strategy: `isMobile`,
      errMsg: '大陆手机号码为11位数字，非大陆手机号码为6-20位'
    }])

    let errMsg: any = validator.start()

    return errMsg
  }
})