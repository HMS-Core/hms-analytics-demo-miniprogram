/*
 * Copyright 2021. Huawei Technologies Co., Ltd. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */

// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answers: [],
    questions: [],
    score: 0,
    userAnswers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getResult(getApp().globalData.scoreResult);
  },

  getResult(result) {
    this.setData({
      answers: result.answers,
      questions: result.questions,
      score: result.score,
      userAnswers: result.userAnswers,
    });
  },
  goBack() {
    wx.navigateTo({
      url: '/pages/answerdemo/answerdemo',
    })
  },
  destroyed() {
    getApp().globalData.showResult = false;
  },
})