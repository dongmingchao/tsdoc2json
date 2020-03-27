
export default interface propTypes {
  /** 快捷选项 */
  options: string[];
  /** 点击checkbox时触发 */
  onChange?(index: number, e: MouseEvent): void;
  /** 返回值number测试 */
  testRetNum?(index: number, e: string): number[];
  /** 
   * 多行
   * 换行测试
   */
  testMutiLine?(index: number, e: string): number[];
  /**
   * 泛型位测试
   */
  testGeneric<T>(arg: Array<T>): T[];
}
