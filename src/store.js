/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    // this.codeCounter = this.state.list.length
    const codes = this.state.list.map(item => item.code);
    // Определяем самый большой `code` из существующих, чтобы исключить `code`, которые будут больше длины массива.
    this.state.lastCode = Math.max(...codes);
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

   /**
   * Добавление новой записи
   */
  addItem() {
    const setCode = this.state.lastCode + 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: setCode, title: 'Новая запись', selectedCount: 0}], lastCode: setCode })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, selectedCount) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected ? '' : item.selectedCount += 1
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
