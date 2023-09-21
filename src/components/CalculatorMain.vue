<script>
    import '/src/assets/main.scss';
    import ButtonInput from "@/components/ButtonInput.vue";
    export default {
      components: {ButtonInput},
        data() {
          return {
            current : '',
            operandStack: [],
            operationStack: [],
            STACK_SIZE : 100,
          }
        },
        methods: {

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
            let result;
            switch (val){
              case '+' :
                return result = a + b;
              case '-' :
                return result = a - b;
              case '*' :
                return result = a*b;
              case '/' :
                return result = a / b;
              default :
                throw new Error('НЕ ТЫКАЙ БЛЯТЬ')
            }
          },

          // вспомогательные функции для кнопок
          //
          ac (){
            this.operandStack = [];
            this.operationStack = [];
            this.current = '';
          },

          // функции на кнопках
          //
          mathButton (val){
            this.pushOperand(this.current);
            if (this.operationStack.length >= 1){
              let op = this.peekBackOperations();
              if (this.findPriority(val) >= 2){
                const b = this.operandStack.pop();
                const a = this.operandStack.pop();
                const goFckYrslf = this.operationStack.pop();
                this.pushOperand(this.doTheFuckingMath(a, b, op));
              }
            }
            this.pushOperator(val);
            this.ac();
          },
          calculator (){
            if (this.operandStack.length !== this.operatorStack.length -1){
              this.current = 'НЕ ТЫКАЙ СУКА'
            }
            while (this.operationStack != 0){
              let var = this.operandStack.pop();
              this.operationStack
            }
          },
      },
    }
</script>

<template>
  <main class="main">
    <p>{{ currentNum }}</p>
    <button-input symbol="1" @click="inputValue('1')"/>
    <button-input symbol="2" @click="inputValue('2')"/>
    <button-input symbol="3" @click="inputValue('3')"/>
    <button-input symbol="=" @click="calculate()"/>
    <button-input symbol="+" @click="mathButton('+')"/>
    <button-input symbol="*" @click="mathButton('*')"/>
    <button-input symbol="AC" @click="ac()"/>


  </main>
</template>

<style lang="scss" scoped>
  .main{
    width: 375px;
    height: 812px;
    background: var(--dark-background, #17171C);
  }

  p{
    font-family: 'Oswald', sans-serif;
    color: #FFF;
    font-size: 42px;
  }
</style>

