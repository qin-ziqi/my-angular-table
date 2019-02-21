import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { IChild } from './interface';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, DoCheck {
  // tslint:disable-next-line:no-inferrable-types
  isView: boolean = false;

  // tslint:disable-next-line:no-inferrable-types
  unitPrice: number = 0;

  // tslint:disable-next-line:no-inferrable-types
  allPrice: number = 0;

  list: Array<IChild> = [
    {
      stageValue: 0,
      stageName: null,

      classValue: 0,
      className: null,

      modelValue: 0,
      modelName: null,

      description: null,
      hours: 0,
      price: 0
    }
  ];

  constructor(
    private _message: NzMessageService
  ) {

  }

  ngOnInit(): void {
    const stageArray = this.getStageItem(1);
    this.list.unshift(...stageArray);
  }

  ngDoCheck(): void {
    this.allPrice = 0;
    this.list.forEach(item => {
      item.price = item.hours * this.unitPrice;
      this.allPrice += item.price;
    });
  }

  /**
   * 用户输入事件
   *
   * @param {*} e
   * @param {*} [i]
   * @memberof AppComponent
   */
  onKeyUp(e, i?) {
    if (i >= 0) {
      this.list[i].hours = e.target.value;
    } else {
      this.unitPrice = e.target.value;
    }
    this.ngDoCheck();
  }

  /**
   * 获取序号信息
   *
   * @param {*} i
   * @returns
   * @memberof AppComponent
   */
  getSortIndex(i) {
    const obj = this.list[i];
    const indexArray = [];
    this.list.forEach(item => {
      if (indexArray.indexOf(item.stageValue) < 0) {
        indexArray.push(item.stageValue);
      }
    });
    return indexArray.indexOf(obj.stageValue) + 1;
  }

  /**
   * 编辑or预览
   *
   * @memberof AppComponent
   */
  toView() {
    this.isView = !this.isView;
    this.logger();
  }

  /**
   * 打印基础数据
   */
  logger() {
    console.log(this.list);
  }

  /**
   * 获取阶段新增的元素
   *
   * @param {*} stageValue
   * @memberof AppComponent
   */
  getStageItem(stageValue) {
    const stageItem = [];
    for (let i = 1; i > 0; i--) {
      for (let j = i; j >= 0; j--) {
        for (let k = j; k >= 0; k--) {
          const item: IChild = {
            stageValue: stageValue,
            stageName: null,

            classValue: j,
            className: null,

            modelValue: k,
            modelName: null,

            description: null,
            hours: 0,
            price: 0
          };
          stageItem.push(item);
        }
      }
    }
    return stageItem;
  }

  /**
   * 获取类别新增的元素
   *
   * @param {*} stageValue
   * @param {*} classValue
   * @memberof AppComponent
   */
  getClassItem(stageValue, classValue) {
    const classItem = [];
    for (let i = 1; i > 0; i--) {
      for (let j = i; j > 0; j--) {
        for (let k = j; k >= 0; k--) {
          const item: IChild = {
            stageValue: stageValue,
            stageName: null,

            classValue: classValue,
            className: null,

            modelValue: k,
            modelName: null,

            description: null,
            hours: 0,
            price: 0
          };
          classItem.push(item);
        }
      }
    }
    return classItem;
  }

  /**
   * 获取模块新增的元素
   *
   * @param {*} stageValue
   * @param {*} classValue
   * @param {*} modelValue
   * @memberof AppComponent
   */
  getModelItem(stageValue, classValue, modelValue) {
    const modelItem = [];
    for (let i = 1; i > 0; i--) {
      for (let j = i; j > 0; j--) {
        for (let k = j; k > 0; k--) {
          const item: IChild = {
            stageValue: stageValue,
            stageName: null,

            classValue: classValue,
            className: null,

            modelValue: modelValue,
            modelName: null,

            description: null,
            hours: 0,
            price: 0
          };
          modelItem.push(item);
        }
      }
    }
    return modelItem;
  }

  /**
   * 添加阶段
   */
  addStage(i) {
    const item = this.list[i - 1];
    const array = this.getStageItem(item.stageValue + 1);
    const length = this.list.length;
    this.list.splice(length - 1, 0, ...array);
    this.logger();
  }

  /**
   * 添加类别
   */
  addClass(i) {
    const item = this.list[i - 1];
    const array = this.getClassItem(item.stageValue, item.classValue + 1);
    this.list.splice(i, 0, ...array);
    this.logger();
  }

  /**
   * 添加模块
   */
  addModel(i) {
    const item = this.list[i - 1];
    const array = this.getModelItem(item.stageValue, item.classValue, item.modelValue + 1);
    this.list.splice(i, 0, ...array);
    this.logger();
  }

  /**
   * 获取阶段所占行数
   *
   * @param {*} i
   * @memberof AppComponent
   */
  getStageRowSpan(i) {
    const obj = this.list[i];
    const existArray = this.list.filter(item => item.stageValue === obj.stageValue);
    return existArray.length;
  }

  /**
   * 获取类别所占行数
   *
   * @param {*} i
   * @memberof AppComponent
   */
  getClassRowSpan(i) {
    const obj = this.list[i];
    const existArray = this.list.filter(item => item.stageValue === obj.stageValue && item.classValue === obj.classValue);
    return existArray.length;
  }

  /**
   * 判断阶段是否显示
   *
   * @param {*} i
   * @memberof AppComponent
   */
  isStageShow(i) {
    if (i === 0) {
      return true;
    }
    if (this.list[i].stageValue === this.list[i - 1].stageValue) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 判断类别是否显示
   */
  isClassShow(i) {
    if (i === 0) {
      return true;
    }
    if (this.list[i].stageValue === this.list[i - 1].stageValue && this.list[i].classValue === this.list[i - 1].classValue) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 判断模块是否显示
   */
  isModelShow(i) {
    if (this.list[i].modelValue === 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 删除阶段
   */
  deleteStage(i) {
    const obj = this.list[i];
    const existArray = this.list.filter(item => item.stageValue !== obj.stageValue);
    if (existArray.length === 1) {
      this._message.warning('至少需要留一个阶段');
    } else {
      this.list = existArray;
    }
  }

  /**
   * 删除类别
   */
  deleteClass(i) {
    const obj = this.list[i];
    const existArray = this.list.filter(item => item.stageValue === obj.stageValue && item.classValue !== obj.classValue);
    if (existArray.length === 1) {
      this._message.warning('至少需要留一个类别');
    } else {
      this.list = this.list.filter(item => item.stageValue !== obj.stageValue || item.classValue !== obj.classValue);
    }
  }

  /**
   * 删除模块
   */
  deleteModel(i) {
    const obj = this.list[i];
    // tslint:disable-next-line:max-line-length
    const existArray = this.list.filter(item => item.stageValue === obj.stageValue && item.classValue === obj.classValue && item.modelValue !== obj.modelValue);
    if (existArray.length === 1) {
      this._message.warning('至少需要留一个模块');
    } else {
      // tslint:disable-next-line:max-line-length
      this.list = this.list.filter(item => item.stageValue !== obj.stageValue || item.classValue !== obj.classValue || item.modelValue !== obj.modelValue);
    }
  }

  ngOnDestroy(): void {
  }
}
