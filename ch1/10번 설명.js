// createReactiveObject 함수는 반응형 객체를 만드는 함수입니다.
// target은 반응형으로 만들 원본 객체이고, callback은 속성 변경 시 호출할 함수입니다.
function createReactiveObject(target, callback) {
    // Proxy 객체를 생성하여 target 객체를 감쌉니다.
    // 이때 제공되는 핸들러 객체에는 set 트랩 함수가 있습니다.
    const proxy = new Proxy(target, {
        // set 함수는 객체의 속성이 변경될 때마다 호출됩니다.
        // obj는 원본 객체, prop는 변경하려는 속성, value는 새로 할당하려는 값입니다.
        set(obj, prop, value){
            // 새로운 값과 기존의 값이 다를 경우에만 콜백 함수를 호출합니다.
            if(value !== obj[prop]){
                const prev = obj[prop] // 기존의 값을 저장합니다.
                obj[prop] = value // 새로운 값으로 속성을 업데이트합니다.
                // 콜백 함수를 호출하며, 변경된 속성과 값들을 문자열로 전달합니다.
                callback(`${prop}가 [${prev}] >> [${value}] 로 변경되었습니다`)
            }
            // set 트랩은 반드시 true를 반환해야 합니다. (false를 반환하면 에러 발생)
            return true
        }
    })
    // 생성된 Proxy 객체를 반환합니다.
    return proxy 
} 

// 예제 객체 a를 생성합니다.
const a = {
    "형규" : "솔로"
} 

// a 객체를 반응형 객체로 만들어 b에 할당합니다.
// 여기서 console.log 함수가 콜백으로 전달됩니다.
const b = createReactiveObject(a, console.log)

// b 객체를 통해 "형규" 속성에 "솔로"를 할당합니다.
// 이미 "솔로"로 되어 있기 때문에, 콜백 함수는 호출되지 않습니다.
b.형규 = "솔로"

// "형규" 속성에 "커플"을 할당합니다.
// 이제 값이 변경되었으므로 콜백 함수가 호출되며, 변화된 내용이 로그로 출력됩니다.
b.형규 = "커플"
// 출력: 형규가 [솔로] >> [커플] 로 변경되었습니다

//Proxy 객체는 기본적인 동작(예: 속성 할당)을 가로채어 사용자 정의 동작을 수행할 수 있게 해줍니다. 
//위의 코드에서 set 트랩은 객체의 속성이 할당될 때 마다 호출되며, 이를 통해 값을 변경하고, 변경 사항에 대한 로깅을 할 수 있게 합니다. 
//set 트랩 함수는 속성 값이 실제로 변경되었을 때만 콜백 함수를 호출하도록 조건을 체크합니다.
