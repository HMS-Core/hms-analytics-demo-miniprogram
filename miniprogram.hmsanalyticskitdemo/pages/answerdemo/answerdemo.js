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

// pages/AnswerDemo.js
const app = getApp()
const ALL_QUESTIONS = 5;

Page({
  /**
   * 组件的初始数据
   */
  data: {
    currentNumber: 0,
    score: 0,
    answers: [true, true, false, false, true],
    questions: [
      'The largest planet in the solar system is Jupiter',
      'The first Olympic Games were held in Athens, Greece',
      'The violin has 6 strings',
      'Flying bats belong to birds',
      'Sound spreads faster in the water than in the air'
    ],
    userAnswers: [],
    answerFinished: false
  },

  onLoad() {
    this.setData({
      userAnswers: new Array(ALL_QUESTIONS)
    });
  },

  goNext() {
    this.setData({
      currentNumber: this.data.currentNumber + 1
    });
    this.setData({
      answerFinished: this.data.currentNumber >= ALL_QUESTIONS
    });
  },
  checkAnswer(answer) {
    answer = answer.target.dataset.answer;
    if (answer === this.data.answers[this.data.currentNumber]) {
      this.setData({
        score: this.data.score + 100 / ALL_QUESTIONS
      });
    }
    let userAnswers = this.data.userAnswers;
    userAnswers[this.data.currentNumber] = answer ? '1' : '0';
    this.setData({
      "userAnswers": userAnswers
    });
    this.reportAnswer(answer);
    this.goNext();
  },

  formatDate() {
    return new Date().toISOString();
  },

  reportAnswer(answer) {
    let answerTime = this.formatDate();
    let reportMessage = {
      question: this.data.questions[this.data.currentNumber],
      answer: answer,
      answerTime: answerTime
    }
    app.globalData.analytics.onEvent("Answer", reportMessage);
  },

  showSettingMenu() {
    wx.navigateTo({
      url: '/pages/setting/setting',
    });
  },

  postScore() {
    let scoreMessage = {}
    scoreMessage[app.globalData.agconnect.analytics.ParamName.SCORE] = this.data.score;
    app.globalData.analytics.onEvent(app.globalData.agconnect.analytics.EventName.SUBMITSCORE, scoreMessage);

    let scoreResult = {
      answers: this.data.answers,
      questions: this.data.questions,
      score: this.data.score,
      userAnswers: this.data.userAnswers
    }
    getApp().globalData.scoreResult = scoreResult;
    wx.navigateTo({
      url: '/pages/result/result',
    });
  }
})