import {PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';

interface CustomButtonListProps {
  label: string;
}
export const CustomButtonList = (props: CustomButtonListProps) => {
  const {label} = props;
  const [array, setArray] = useState<string[]>([]);
  const [text, onChangeText] = useState('');

  const addNewValue = useCallback(() => {
    //setArray([...array, `${array.length + 1}`]);
    setArray([...array, `${array.length + 1}`]);
  }, [array]);

  const onRemove = useCallback(
    (index: number) => {
      const oldArray = [...array];
      setArray(oldArray.filter((_item, _index) => _index !== index));
    },
    [array],
  );

  console.log(array);

  return (
    <Container>
      {array.map((item, index) => {
        console.log('stt', index);
        return (
          <InputContainerView key={index}>
            <InputContainer
              onPress={() => {
                onRemove(index);
              }}>
              <PlusIcon source={REMOVE_ICON} />
            </InputContainer>
            <InputContact
              value={item}
              placeholder={'Mời nhập'}
              onChangeText={onChangeText}
            />
          </InputContainerView>
        );
      })}
      <ButtonContactContainer onPress={addNewValue}>
        <PlusIcon source={PLUS_ICON} />
        <ButtonContactText>{label}</ButtonContactText>
      </ButtonContactContainer>
    </Container>

    // <Container>
    //   {array.map(item => {
    //     return (
    //       // onRemove && onRemove(index)
    //       <InputField />
    //     );
    //   })}
    //   <ButtonContactContainer onPress={addNewValue}>
    //     <PlusIcon source={PLUS_ICON} />
    //     <ButtonContactText>{label}</ButtonContactText>
    //   </ButtonContactContainer>
    // </Container>
  );
};

// export const CustomButtonList = (props: CustomButtonListProps) => {
//
//   const {label,data,setData} = props;
//
//   // const [array, setArray] = useState<string[]>([]);
//
//
//
//   const addNewValue = () => {
//     setData && setData(array => array.concat([{id: random, phone:...}]))
//   };
//
//   const onRemove = (id) => {
//
//     // muon xoa can phai biet vi tri can xoa
//
//     setData && setData(array => array.filter(item => item.id !== id));
//
//     //
//
//     // setArray(array => array.filter(pitem => pitem. != index));
//
//   };
//
//   return (
//     <Container>
//       {data && data.length > 0 && data.map(item => {
//         const onPress = () => {
//           onRemove(item.id)
//         }
//         return (
//           // onRemove && onRemove(index)
//           <InputContainer onPress={onPress}>
//             <PlusIcon source={REMOVE_ICON} />
//             <InputContact placeholder={'Mời nhập'} />
//           </InputContainer>
//         );
//       })}
//       <ButtonContactContainer onPress={addNewValue}>
//         <PlusIcon source={PLUS_ICON} />
//         <ButtonContactText>{label}</ButtonContactText>
//       </ButtonContactContainer>
//     </Container>
//   );
// };

const Container = styled.View`
  width: 100%;
  background-color: white;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
`;

const PlusIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const ButtonContactText = styled.Text`
  font-family: Roboto-Regular;
  font-size: 15px;
  font-weight: 400;
  color: #333333;
  padding-left: 42px;
`;

const ButtonContactContainer = styled.TouchableOpacity`
  height: 44px;
  width: 90%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const InputContainer = styled.TouchableOpacity``;

const InputContainerView = styled.View`
  height: 44px;
  width: 90%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
  justify-content: center;
`;

const InputContact = styled.TextInput`
  width: 93%;
  padding-left: 47px;
  color: #2f80ed;
  font-weight: 400;
  font-size: 15px;
  font-family: Roboto-Regular;
`;
