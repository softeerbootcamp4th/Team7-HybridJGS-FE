// import { Meta, StoryFn } from "@storybook/react";
// import RushCardComparison from "@/components/RushCardComparison";
// import { CARD_DAYS, CARD_SELECTED_STATUS, CARD_TYPE } from "@/constants/Rush/rushCard";
//
// export default {
//     title: "Components/RushCardComparison",
//     component: RushCardComparison,
//     argTypes: {
//         currentDay: {
//             control: { type: "select" },
//             options: Object.values(CARD_DAYS),
//             description: "The current day for selecting the card colors and titles",
//             table: {
//                 type: { summary: "CARD_DAYS" },
//                 defaultValue: { summary: CARD_DAYS.DAY1 },
//             },
//         },
//         firstCardType: {
//             control: { type: "select" },
//             options: Object.values(CARD_TYPE),
//             description: "The type of the first card",
//             table: {
//                 type: { summary: "CARD_TYPE" },
//                 defaultValue: { summary: CARD_TYPE.FIRST_CARD },
//             },
//         },
//         secondCardType: {
//             control: { type: "select" },
//             options: Object.values(CARD_TYPE),
//             description: "The type of the second card",
//             table: {
//                 type: { summary: "CARD_TYPE" },
//                 defaultValue: { summary: CARD_TYPE.SECOND_CARD },
//             },
//         },
//         cardStatus: {
//             control: { type: "select" },
//             options: Object.values(CARD_SELECTED_STATUS),
//             description: "The selection status of the card",
//             table: {
//                 type: { summary: "CARD_SELECTED_STATUS" },
//                 defaultValue: { summary: CARD_SELECTED_STATUS.FALSE },
//             },
//         },
//     },
// } as Meta;
//
// const Template: StoryFn<typeof RushCardComparison> = (args) => <RushCardComparison {...args} />;
//
// export const FirstDay = Template.bind({});
// FirstDay.args = {
//     currentDay: CARD_DAYS.DAY1,
//     firstCardType: CARD_TYPE.FIRST_CARD,
//     secondCardType: CARD_TYPE.SECOND_CARD,
//     cardStatus: CARD_SELECTED_STATUS.FALSE,
// };
// export const SecondDay = Template.bind({});
// SecondDay.args = {
//     currentDay: CARD_DAYS.DAY2,
//     firstCardType: CARD_TYPE.FIRST_CARD,
//     secondCardType: CARD_TYPE.SECOND_CARD,
//     cardStatus: CARD_SELECTED_STATUS.FALSE,
// };
// export const ThirdDay = Template.bind({});
// ThirdDay.args = {
//     currentDay: CARD_DAYS.DAY3,
//     firstCardType: CARD_TYPE.FIRST_CARD,
//     secondCardType: CARD_TYPE.SECOND_CARD,
//     cardStatus: CARD_SELECTED_STATUS.FALSE,
// };
// export const FourthDay = Template.bind({});
// FourthDay.args = {
//     currentDay: CARD_DAYS.DAY4,
//     firstCardType: CARD_TYPE.FIRST_CARD,
//     secondCardType: CARD_TYPE.SECOND_CARD,
//     cardStatus: CARD_SELECTED_STATUS.FALSE,
// };
// export const FifthDay = Template.bind({});
// FifthDay.args = {
//     currentDay: CARD_DAYS.DAY5,
//     firstCardType: CARD_TYPE.FIRST_CARD,
//     secondCardType: CARD_TYPE.SECOND_CARD,
//     cardStatus: CARD_SELECTED_STATUS.FALSE,
// };
// export const SixthDay = Template.bind({});
// SixthDay.args = {
//     currentDay: CARD_DAYS.DAY6,
//     firstCardType: CARD_TYPE.FIRST_CARD,
//     secondCardType: CARD_TYPE.SECOND_CARD,
//     cardStatus: CARD_SELECTED_STATUS.FALSE,
// };
export default {};
