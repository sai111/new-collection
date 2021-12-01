<template>
  <view class="city-picker">
    <view class="city-picker-container" :class="show?'show':''">
      <view class="city-picker-shadow" @tap="hideCityPicker" />
      <view class="city-picker-wrap">
        <view class="city-picker-header">
          <view class="city-picker-cancel" @tap="hideCityPicker">取消</view>
          <view class="city-picker-submit" @tap="submitCityPicker">确定</view>
        </view>
        <picker-view
          :value="provinceArr"
          indicator-class="custom-picker"
          indicator-style="height: calc(40/16*1rem);"
          style="width:100%;height: calc(200/16*1rem);line-height:calc(40/16*1rem);text-align:center;"
          @change="changeCityPicker"
        >
          <!-- 省 -->
          <picker-view-column>
            <view v-for="(province, index1) in provinces" :key="'province-li-'+index1">{{ province }}</view>
          </picker-view-column>
          <!-- 地级市 -->
          <picker-view-column>
            <view v-for="(city, index1) in citys" :key="'city-li-'+index1">{{ city }}</view>
          </picker-view-column>
          <!-- 区县 -->
          <picker-view-column>
            <view v-for="(county, index1) in county" :key="'county-li-'+index1">{{ county }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>
<script>
import { reactive, toRefs, onMounted } from 'vue'
import './index.scss'
import cityJson from './city.min.json'
export default {
  props: {
    show: false,
    value: [],
    name: ''
  },
  setup(props, context) {
    const data = reactive({
      provinces: cityJson[86],
      citys: cityJson[props.value && props.value[0] ? props.value[0] : 110000],
      county: cityJson[props.value && props.value[1] ? props.value[1] : 110100],
      codes: props.value && props.value.length > 0 ? props.value : [110000, 110100, 110101],
      names: props.name ? props.name : '北京市-市辖区-东城区',
      provinceArr: [0, 0, 0]
    })
    onMounted(() => {
      initValue()
    })
    // 获取下标
    const initValue = () => {
      if (props.value && props.value.length > 0) {
        const proIndex = Object.keys(data.provinces).findIndex((v) => v === data.codes[0])
        const cityIndex = Object.keys(data.citys).findIndex((v) => v === data.codes[1])
        const couIndex = Object.keys(data.county).findIndex((v) => v === data.codes[2])
        data.provinceArr = [proIndex > 0 ? proIndex : 0 , cityIndex > 0 ? cityIndex : 0, couIndex > 0 ? couIndex : 0]
      }
    }
    // 初始化选择器信息
    const togglePicker = (arr) => {
      const provinceNum = arr[0]
      const cityNum = arr[1]
      const countyNum = arr[2]
      // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据
      if (data.codes[0] !== provinceNum) {
        data.citys = cityJson[Object.keys(cityJson[86])[provinceNum]]
        data.county = cityJson[Object.keys(data.citys)[cityNum]]
      } else if (data.codes[1] !== cityNum) {
        // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
        data.county = cityJson[Object.keys(data.citys)[cityNum]]
      }
      const province = Object.keys(cityJson[86])[provinceNum]
      const city = Object.keys(data.citys)[cityNum]
      const county = Object.keys(data.county)[countyNum]
      const provinceName = Object.values(cityJson[86])[provinceNum]
      const cityName = Object.values(data.citys)[cityNum]
      const countyName = Object.values(data.county)[countyNum]
      data.provinceArr = arr
      data.names = `${provinceName}-${cityName}-${countyName}`
      data.codes = [province, city, county]
    }
    // 列滚动
    const changeCityPicker = (e) => {
      let result = e.detail.value
      if (data.provinceArr[0] !== e.detail.value[0]) {
        result = [e.detail.value[0], 0, 0]
      } else if (data.provinceArr[1] !== e.detail.value[1]) {
        result = [e.detail.value[0], e.detail.value[1], 0]
      }
      togglePicker(result)
    }
    // 取消
    const hideCityPicker = () => {
      context.emit('closePicker', data.codes, data.names)
    }
    // 确认
    const submitCityPicker = () => {
      context.emit('closePicker', data.codes, data.names)
    }
    return {
      ...toRefs(data),
      submitCityPicker,
      hideCityPicker,
      changeCityPicker,
      initValue
    }
  }
}
</script>
