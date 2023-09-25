<script>
    import '/src/assets/main.scss';
    import ButtonInput from "@/components/ButtonInput.vue";
    export default {
      components: {ButtonInput},
        data() {
          return {
            current : '0',
            operandStack: [],
            operationStack: [],
            history: '',
            firstOperand : 0,
            secondOperand : 0,
            operation : '',
            op : 0,
          }
        },
        methods: {
          notWorking(){
            alert('Пока что не работает')
          },

          inputValue(val){
            if (this.current === '0') this.current = '';
            this.current += val;
            this.history += val;
          },
//функции для работы со стеками
    //    
          pushOperand (operand){
            this.operandStack.push(operand);
          },
          pushOperator (operator){
            this.operationStack.push(operator);
          },
          peekBackOperands (){
            this.operandStack[this.operandStack.length - 1];
          },
          peekBackOperations (){
            this.operationStack[this.operationStack.length - 1];
          },

        // функция поиска приоритета
        //
          findPriority(val){
            const priority = {
              '+' : 1,
              '-' : 1,
              '*' : 2,
              '/' : 2,
            };
              for (const key in priority){
                if (key === val) return priority[key];
            }
          },

          // функция для выполнения операций
          //
          doTheFuckingMath (a, b, val){
            switch (val){
              case '+' :
                return String(Number(a) + Number(b));
              case '-' :
                return String(Number(a) - Number(b));
              case '*' :
                return String(Number(a) * Number(b));
              case '/' :
                return String(Number(a) / Number(b));
              default :
                console.log('ОШИБКА БЛЯТЬ')
            }
        },

          // дополнительные кнопки
          //
          ac (){
            this.operandStack = [];
            this.operationStack = [];
            this.current = '';
          },
          
          invert() {
            if (Math.sign(this.current) === -1){
              let a = this.current;
              return this.current = String(Math.abs(a));
            }
            if (Math.sign(this.current) === 1){
              this.current = String(this.current * -1)
            }
          },

          float(){
            
            let a = Number(this.current)
            if (Number.isInteger(Number(this.current))){
              return this.current+='.'
            }
          },

          del(){
            this.current = this.current.slice(0, -1);
          },
          
          // функция операторов
          //FIXME: сама функция работает исправно, надо разобраться 
          // почему поочередное добавление не работает
          // 
          mathButton (val){
            if (this.operationStack.length >= 1){
              let lastOp = this.operationStack[this.operationStack.length - 1];
              let thisOp = val;
              lastOp = this.findPriority(lastOp);
              thisOp = this.findPriority(thisOp);
              if (lastOp < thisOp){
                const b = Number(this.current);
                const a = this.operandStack.pop();
                let test = this.doTheFuckingMath(a, b, val);
                this.pushOperand(test)
              }
            } else {
            this.pushOperand(this.current);
            this.pushOperator(val);
            this.current = '0';
            }
},
          
          calculator (){
            this.pushOperand(this.current);
            if (this.operandStack.length !== this.operationStack.length -1){
              this.current = 'НЕ ТЫКАЙ СУКА'
            }
            while (this.operationStack.length != 0){
              this.secondOperand = this.operandStack.pop();
              this.firstOperand = this.operandStack.pop();
              this.operandStack.push(this.doTheFuckingMath(this.secondOperand, this.firstOperand, this.operationStack.pop()));
            }
            this.current = this.operandStack[this.operandStack.length - 1]
            // this.history += this.
          },
      },
    }
</script>

<template>
  <main class="main">
    <!-- <p class="history">{{ history }}</p> -->
    <p class="input">{{ current }}</p>
    <article class="buttons">
      <button-input class="numpad-button grey" symbol="AC" @click="ac()"/>
      <button-input class="numpad-button grey" symbol="+/-" @click="invert()"/>
      <button-input class="numpad-button grey" symbol="%" @click="notWorking()"/>
      <button-input class="numpad-button blue" symbol="÷" @click="mathButton('/')"/>
      <button-input class="numpad-button" symbol="7" @click="inputValue('7')"/>
      <button-input class="numpad-button" symbol="8" @click="inputValue('8')"/>
      <button-input class="numpad-button" symbol="9" @click="inputValue('9')"/>
      <button-input class="numpad-button blue" symbol="*" @click="mathButton('*')"/>
      <button-input class="numpad-button" symbol="4" @click="inputValue('4')"/>
      <button-input class="numpad-button" symbol="5" @click="inputValue('5')"/>
      <button-input class="numpad-button" symbol="6" @click="inputValue('6')"/>
      <button-input class="numpad-button blue" symbol="-" @click="mathButton('-')"/>
      <button-input class="numpad-button" symbol="1" @click="inputValue('1')"/>
      <button-input class="numpad-button" symbol="2" @click="inputValue('2')"/>
      <button-input class="numpad-button" symbol="3" @click="inputValue('3')"/>
      <button-input class="numpad-button blue" symbol="+" @click="mathButton('+')"/>
      <button-input class="numpad-button" symbol="." @click="float()"/>
      <button-input class="numpad-button" symbol="0" @click="inputValue('3')"/>
      <button-input class="numpad-button" symbol="DEL" @click="del()"/>
      <button-input class="numpad-button blue" symbol="=" @click="calculator()"/>
    </article>
  </main>
</template>

<style lang="scss" scoped>
  .main{
    width: 375px;
    height: 812px;
    background: var(--dark-background, #17171C);
    box-sizing: border-box;
  }

  .history{
    height: 47px;
    font-family: 'Oswald', sans-serif;
    color: #9b9b9b;
    font-size: 40px;
    font-weight: 300;
    padding-top: 147px;
    display: flex;
    justify-content: flex-end;
    margin: 0 20px 0 20px;
  }
  .input{
    height: 96px;
    font-family: 'Oswald', sans-serif;
    color: #FFF;
    font-size: 96px;
    font-weight: 300;
    padding-top: 16px;
    display: flex;
    justify-content: flex-end;
    margin: 0 20px 0 20px;
  }

  .buttons{
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
  }

  .numpad-button{
    margin-top: 16px;
  }
  .blue{
  background: #4B5EFC;
  }
  .grey{
  background: #4E505F;
  }
  .blue{
    &:active{
      background: #949fff
    }
  }
  .grey{
    &:active{
      background: #949fff
    }
  }
</style>

