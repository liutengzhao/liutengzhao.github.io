// visitorInfo.js

export function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Google Chrome";
    browserVersion = userAgent.match(/Chrome\/(\d+)/)[1];
  } else if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Mozilla Firefox";
    browserVersion = userAgent.match(/Firefox\/(\d+)/)[1];
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Apple Safari";
    browserVersion = userAgent.match(/Version\/(\d+)/)[1];
  } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
    browserName = "Microsoft Internet Explorer";
    browserVersion = userAgent.match(/rv:(\d+)/)[1];
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Microsoft Edge";
    browserVersion = userAgent.match(/Edge\/(\d+)/)[1];
  }

  return { name: browserName, version: browserVersion };
}

export function getOsInfo() {
  const userAgent = navigator.userAgent;
  let osName = "Unknown";
  let osVersion = "Unknown";

  if (userAgent.indexOf("Win") !== -1) {
    osName = "Windows";
  } else if (userAgent.indexOf("Mac") !== -1) {
    osName = "MacOS";
  } else if (userAgent.indexOf("Linux") !== -1) {
    osName = "Linux";
  } else if (userAgent.indexOf("Android") !== -1) {
    osName = "Android";
  } else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
    osName = "iOS";
  }

  return { name: osName, version: osVersion };
}

// 注意：这个函数需要在HTML中引入高德地图API并设置Key
// 因为安全原因，这个示例不会包含实际的高德地图API调用
// 你需要在HTML中设置Key并调用高德地图API获取地理位置
// export async function getLocation() {
//   // 示例代码，实际应用中需要根据高德地图API文档进行实现
//   // return "中国, 北京, 海淀区";
// }
// visitorInfo.js

// ... 上面的getBrowserInfo和getOsInfo函数保持不变 ...

// 使用高德地图API获取地理位置信息
export async function getLocation() {
  return new Promise((resolve, reject) => {
    // 确保高德地图API已经加载
    if (typeof AMap === 'undefined') {
      reject("AMap API is not loaded.");
      return;
    }

    AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置
        buttonPosition: 'LB',
        // 自动调整地图视野使定位点居中
        zoomToAccuracy: true,
        // 成功获取位置后的回调函数
        onComplete: (data) => {
          // 解析地理位置信息
          const { country, province, city } = data.addressComponent;
          resolve(`${country}, ${province}, ${city}`);
        },
        // 定位失败的回调函数
        onError: (error) => {
          reject(`Geolocation error: ${error}`);
        },
      });

      // 开始定位
      geolocation.getCurrentPosition();
    });
  });
}
