export function createVNode(type, props, ...children) {
  const flattenChildren = children
    .flat(Infinity) // Infinity: 중첩 깊이와 관계없이 완전히 평탄화
    .filter(
      (child) =>
        child !== null && // null 제거
        child !== undefined && // undefined 제거
        child !== false && // false 제거 (조건부 렌더링)
        child !== true, // true 제거 (조건부 렌더링)
    );

  return {
    type, // 요소 타입 (HTML 태그명 또는 컴포넌트 함수)
    props, // 속성 객체 (className, onClick 등)
    children: flattenChildren, // 정리된 자식 요소 배열
  };
}
