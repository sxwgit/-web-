from collections import Counter
import pytest

win_map = {
        "散牌":1,
        "对子":2,
        "两对":3,
        "三条":4,
        "顺子":5,
        "同花":6,
        "葫芦":7,
        "铁支":8,
        "同花顺":9,
    }

def card_type(cards):
    # 接受牌，判断牌的类型
    colors = [card[1] for card in cards]
    numbers =  [card[0] for card in cards]
    all_numbers = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"] 
    numbers_index = [all_numbers.index(i) for i in numbers]
    # 判断是否同花
    if len(set(colors)) == 1:   #为同花
        min_numbers_index = min(numbers_index)
        max_numbers_index = max(numbers_index)
        if (max_numbers_index - min_numbers_index)+1 == len(numbers):
            return ("同花顺",max_numbers_index)
        else:
            differ_numbers_index = numbers_index[:]      
            differ_numbers_index.sort(reverse=True)
            return ("同花",differ_numbers_index)
    
    counter_number = Counter(numbers_index) # dict
    same_num = max(counter_number.values()) # 相同数目最多的数的数目
    # 有四张大小相同的牌,判读是否是铁支
    if same_num == 4:
        for key,value in counter_number.items():
            if value == 4:
                same_cards_index = key
        return ("铁支",same_cards_index)
    # 有三张大小相同的牌,判断是否是葫芦或三条
    if same_num == 3:
        if len(counter_number) == 2:
            for key,value in counter_number.items():
                if value == 3:
                    same_cards_index = key
            return ("葫芦",same_cards_index)
        if len(counter_number) == 3:
            for key,value in counter_number.items():
                if value == 3:
                    same_cards_index = key
            return ("三条",same_cards_index)
        else:
            assert "不应该出现这个情况，也许不会用到这个分支，但是先写上？？" 
    # 判断顺子
    min_numbers_index = min(numbers_index)
    max_numbers_index = max(numbers_index)
    if (max_numbers_index - min_numbers_index)+1 == len(numbers) and len(set(numbers_index))==5:
        return ("顺子",max_numbers_index)
    # 判读两对，对子，散牌
    if same_num == 2: # 存在对子
        flag = 0
        key_list = []
        for key,value in counter_number.items():
            if value == 2:
                flag += 1
                key_list.append(key)
        if flag == 2: #存在两个对子
            # 比较逻辑 比较大对子的大小，若相同，比较小对子的大小，若还相同，比较单张牌的大小，
            # 所以返回的列表，第一个是大对子的索引，第二个是小对子的索引，第三个是单牌的索引
            key_list.sort(reverse=True) #先是大对子，然后小对子
            for key,value in counter_number.items():
                if value == 1:
                    single_cards_index = key
            key_list.append(single_cards_index)
            return ("两对",key_list)
        if flag == 1: # 存在一个对子
            single_key_list = []
            for key,value in counter_number.items():
                if value == 1:
                    single_key_list.append(key)
            single_key_list.sort(reverse=True) # 确保单卡是从大到小排列
            key_list = key_list + single_key_list
            return ("对子",key_list)
    if same_num == 1: #散牌
        differ_numbers_index = numbers_index[:]      
        differ_numbers_index.sort(reverse=True)
        return ("散牌",differ_numbers_index)

def card_game(black_cards,white_cards):
    black_cards = black_cards.split()
    white_cards = white_cards.split()
    # 首先判断黑色牌和白色牌的类型，有9种情况
    # 同花顺＞铁支＞葫芦＞同花＞顺子＞三条＞两对＞对子＞散牌
    black_type,black_num = card_type(black_cards)
    white_type,white_num = card_type(white_cards)
    print("----{}----".format("黑牌"))
    print("黑牌类型是{}，对应输出是{}".format(black_type,black_num))
    print("----{}----".format("白牌"))
    print("白牌类型是{}，对应输出是{}".format(white_type,white_num))
    if win_map[black_type] > win_map[white_type]:
        return "Black wins"
    elif win_map[black_type] < win_map[white_type]:
        return "White wins"
    else: #此时两个类型相同，依次判断
        if black_type == "同花顺": #同花顺第二项返回的是最大值
            if black_num > white_num:
                return "Black wins"
            elif black_num < white_num:
                return "White wins"
            else:
                return "Tie"
        if black_type == "铁支": # 铁支返回的是相同卡牌的索引
            if black_num > white_num:
                return "Black wins"
            elif black_num < white_num:
                return "White wins"
            else:
                return "Tie"
        if black_type == "葫芦": # 葫芦返回的也是相同卡牌的索引
            if black_num > white_num:
                return "Black wins"
            elif black_num < white_num:
                return "White wins"
            else:
                return "Tie"
        if black_type == "同花": # 同花返回的整个卡牌的下标，按照从大到小排列
            for i in range(len(black_num)):
                black_card = black_num[i]
                white_card = white_num[i]
                if black_card > white_card:
                    return "Black wins"
                elif black_card < white_card:
                    return "White wins"
            return "Tie"
        if black_type == "顺子": # 葫芦返回的是最大卡牌的索引
            if black_num > white_num:
                return "Black wins"
            elif black_num < white_num:
                return "White wins"
            else:
                return "Tie"
        if black_type == "三条":# 三条返回的是相同卡牌的索引
            if black_num > white_num:
                return "Black wins"
            elif black_num < white_num:
                return "White wins"
            else:
                return "Tie"
        if black_type == "两对": # 两对返回，第一个是大对子的索引，第二个是小对子的索引，第三个是单牌的索引
            for i in range(len(black_num)):
                black_card = black_num[i]
                white_card = white_num[i]
                if black_card > white_card:
                    return "Black wins"
                elif black_card < white_card:
                    return "White wins"
            return "Tie"
        if black_type == "对子": 
            for i in range(len(black_num)):
                black_card = black_num[i]
                white_card = white_num[i]
                if black_card > white_card:
                    return "Black wins"
                elif black_card < white_card:
                    return "White wins"
            return "Tie"
        if black_type == "散牌": 
            for i in range(len(black_num)):
                black_card = black_num[i]
                white_card = white_num[i]
                if black_card > white_card:
                    return "Black wins"
                elif black_card < white_card:
                    return "White wins"
            return "Tie"

def test_win():
    assert card_game("2H 3D 5S 9C KD","2C 3H 4S 8C AH") == "White wins"
    assert card_game("2H 4S 4C 2D 4H","2S 8S AS QS 3S") == "Black wins"
    assert card_game("2H 3D 5S 9C KD","2C 3H 4S 8C KH") == "Black wins"
    assert card_game("2H 3D 5S 9C KD","2D 3H 5C 9S KH") == "Tie"
    assert card_game("4H 5H 6H 7H 8H","7H 7D 7S 9C 8D") == "Black wins" # 同花顺和对子
    assert card_game("7H 7D AS 9S JD","8H 8D AS 9S JD") == "White wins"
    assert card_game("8D 9D 3H TH 2S","8D 9D 3H TH 3S") == "White wins"

 
def test_type():
    cards = "2H 3D 5S 9C KD"
    cards = cards.split()
    assert card_type(cards)[0] == "散牌"
    cards = "2H 4S 4C 2D 4H"
    cards = cards.split()
    assert card_type(cards)[0] == "葫芦"
    cards = "2H 4S 3C 5D 6H"
    cards = cards.split()
    assert card_type(cards)[0] == "顺子"
    


if __name__ == "__main__":
    # 两个测试，一个用来测试type是否正确，两一个判断胜负关系是否正确
    # args=["-v",__file__+"::test_type"] # 选择某一个案例测试
    args = ["-v",__file__]
    print(args)
    pytest.main(args)