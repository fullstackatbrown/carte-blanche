import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import ScrollingGrid from "../src/components/ScrollingGrid";

import styles from "../styles/ScrollingGrid.module.scss";
import IContent from "../types/IContent";

const tempData = [
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chipmunk-nature-photos-1537973822.jpg",
    "https://media.istockphoto.com/id/680810342/photo/dog-watching-tv-on-the-couch.jpg?s=612x612&w=0&k=20&c=CQXmfuqlwL49GhcLDXIQSEZwq3iGpIkPJneWJUiI_0U=",
    "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png",
    "https://m.media-amazon.com/images/I/51hGiAQCw-L._SY580_.jpg",
    "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png",
    "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png",
    "https://i.imgflip.com/4m9grc.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    "https://static.boredpanda.com/blog/wp-content/uploads/2014/01/animal-children-photography-elena-shumilova-2.jpg",
    "https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExIVFhUVFxcXFRUVFxUXFRgXGBYWFxUVFRcYHSggGBolHRcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALIBGwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xAA8EAABAwMCBAQDBQcEAgMAAAABAAIRAwQhMUEFElFhBhNxgSKRsRQyocHwBzNCYpLR4SNSgvEVUxZysv/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAAEEBQb/xAAxEQACAgEEAAMGBQUBAQAAAAABAgADEQQSITETQVEFImFxgfAykaGxwRRS0eHxQhX/2gAMAwEAAhEDEQA/ALx5q5NQKv8AhHxEy8aQYFRokgaQdIVkFupJIw8LoPCmFmuhZDqpJBxUWcyJbaDqpmWzVJIGwlTtJRLaDVM1jeikkFYuwUWGDouvLHRSSDAKUBTiiFvlhSSQimpGt6rVxdMpt5nkNHUmAsZXa7Qg+hUknQaOi6gLklRl5UlZhBIUFQSoy4rn3V4lboPVYN0Dd0wMpk5gUFagDqmrwZktGRxFgHb1TO3dgLH8OJGCtUrZzXAAEoiVIiq91bcjiEloS27dsmNeQNMpPckzOcoa0zGam4KMTpjwFJ5w1UdK05juihw5wBRMq5iq7nI4HEErVSRhKXcxlOfsrgcIW+ty2dCUaYHERqLSy7jniILm7c0xJUnDb93NkY0Ud+wbnPRQWDodAP8A2thRSnU4i6uxL/xHGfsS1PbjCHY0lT2d2COXVw1/wmlG2bqd8rmMCvBnrarBaAymJPKlcOtSrK2zbquhat6IcxwEqbrQ9Fz9jd0Vu+zjot+UOirMm2fPXBfEJs2uaGte54jmBgtb0B6q18P/AGgv5KQDGhrS0VCSXPj+IryuSira4c2SDrg+irbLzPp7hdzTrUxUpmWnQowMXiPAf2jPoUzTFMAcoDSDkO3JTnhP7RGtqDnceUxOu+p9lWZMz1cUR0W/s4Xl3if9pLxDbSHdXuB+QCbeEfH9N1A/aXtbUbqM5HUK5cvRtgtfZu6XUON067XmlUaeQAnPXIQh48AATVYAcDOpVZl4j4U1I1iolTjdSrVdFUANPw8px6pjxrxA6hbtc1wdUdEDXG6vmVmWlzmjBcAe68i8Q+M7qoatGm5rWiqQHtJDuVp/xqlt94luXXDa3MZb91uw6yll/HM95eXVXjmPLES7UHorKmDnPUb+L727NOl5xLqfLiWwC4jBdCn/AGd8ZdSc/myIDqjnOghrccoB1STjF1cijSpurB9IgOEGc9HE5kJbaVIJkmD03QhCeZROJ9E2d7Sq/u6jHSAcEHBRJtyvB+C8Z8mq19IOHKQcnWNj2XrHhrxqLh/lvptaTkOB+H0PdONbBdwixau7aePSPxala+xjeUa5p2AXLATql5MbsEh+xt6LVW3aNkW6lI1QdezJ/iwrB9YLLxwMzQIA2Utu0Z6oOnbgnVGU6TRpqocQULGQ3H55SksDqnYJ3UDdCMpYKDQ6QESmZtShLD0+/hCqFvp0W7t0D4cldB0CFqrcBoyEI7juAmM4ie6ruAzjugLj4gDzT1RHErprvZKW3bZA+m6211nGcTz+q1AD4LZHziviAJcZEIVsApvxSq120ax3SRzVsTlZwrhiw85jrhlw0Omfi7j8FZKdzodZVLs6JccGCrDSe4AB22+6x6isZ4nd9l6uwKQRx6yy0qwONMaKcMVY+0nm0JTS04niHArEVnoq71fiMyxc8igN+3oVr7ezuhj58ntKkaVpjFstTtsVunbnIijUwoWMG5UtSmBoh2wi0Mp10dQrekx80poNKKDYymLTniLawDkxta1HifjLQdQDAI6HqiW1evtlK7Z5K7L5GdVpXTTK+pwI1Y52rXabKX7S4xJPbJ/BK6LHYM47rvzzOqo1qDIthIhl2yWmDlLPJdOZDkb54I7qN2c7wounZ+pH1K19wC6L8BxMDRR85P5Jl5JLcwfqhvIdOEf9KYo61TmSUAYlWnwsCxwd/UO35JJa2bxkkFWvgtMSIbIxJ7+i0rUAvUzNcxfuW6v40FGm51RuZ5abRjmxuTp3VTvvHtV2C+BIwyQ0ZnXU+5+Sr/7Q7h3nNaNGtHKNpcTzOn2ASK0o1Rny3VBGAGOLexB0K5NqqGIUTuUFigLec9Btv2j1QZeQWnE9PcK4t8UNqMY5oJBGs59PmvDH2lZsuLCOoc1zRHQkiPxV28A1eeg9pyGux1AIGPmD80VKqzYIitYXWosvEvdvxr4ukplZXwBcS7Cq9SlC5D8YK1Np1PU5VersXvmWn/yLajoB0RTy0CCcqgML2mZOqLq3b3QST80LaT0PEMazglhzLox46obidwxoyVW6PFHtIOvVRcRvDU7BCukbdz1Av16io47nN25r9/kljisa4jRRucumte3ieQut8U5xgzTloU50XJetC4IMqFTBUGPrOwjQQeslG3NVjWnmcBGqRs8QEYLceufZV/iNyXOcc56/gsX9Ozt73E9CmqqqTbUM5+mPjLtSnB2RH20Aqn2XGvKDQXFwGoKnpeK6XOA9vK2DJ77LO+mbvE6VGqUYAPP359S1VeKAwIUP21qR3HiazDiA/QTgYQTvGVuDgE+yT4Xwm/xyOyJ4+0rsuWnFYBKcohO06DFO1oAzquGNKKpUSU1KczO12Ju3bujXNBGi1Sp7IulRWyuoATDbeTIbOnAMjJwD0RNC1mTOOvX0W5PVTMcCIjKMVnMW1oIkTyBiQRohqlIES1FimJyJXb6AMQPWFTU5aRdQQsjt7PfVHcObB0mTujuEAAcnL8W+NQnVjYgO5i30HRGqivOYDsbcbeOYO6zoNblkT1MmUtZw81DLWmdABqekDdWGrBMkDrlbpfeNQP8ALps5RUdMfecAGiBPM7QR17pb3bFLfv1H16YWuF8vgOYmPA67B+5dG8QY9QCSE64ZbBgGTO6RcY4uKNw1lAcge3mp1GPJDxoZBOHBP+HcduCAKrQ9vVwBXNPtQ9Mv5f45/edgexFA9x/zH8jH7SveI7yg25Li01qzWwxkEMY1oBcSdOaXDOTkaJNY8Q4hcPhlGty7eVTBb7vMx8088S8bbSfzMY1gZWoV3AADJ5mPx3DBKtFTxWCPvLnPcWJPrOmlIRQoPURcK8N8ULpq1qdNmzaoZUd/TSj/APYVp4f4dt6LzUDjzOHxhsMY87OLcmRnfcpNceJcEhw/JDs8RB0Q8EnYEH6IBa4ORDalGGG5EtdzUogZZP8Ayd/dL216T58sOBbq05EdRKQXHGQMEmem/wAl1wjiX+qABh2D6JleptVwSTjzzEW6HTvWVVQDjggAc/SOHNnVc029US+lC5czdd/M8iRIHEKOqJGFJUYuXAQiEx2AniAVcKB7lPchDOK0jkTjumHImio3roOnRaJUxLAkNRhQtc6yEU+ooqgBGqrEchx3FnmjdAcRDSDGJRl5RA3lJ76pBkDCTacKZ1tKgZwQYrrkt0Kg893VSVH83QKLlK47Bs8T04ZcczloEKSnTXVBqOZRwt1dcwW28yOjRRtGllapsTCypSQJidytiJMNthndjw91R3KwSddQMepTP/49XBgsPtn/AKVl4BY06bQ4NkwZqHfsO2E3ZeBu2Tv2RM5zgCYnvrXlzKlxDw+RyMayMAF8Y7k/hqgq3CTSIBhxOkT2291fHX4OunoorqjTqgzHNBAdGRhCHYdiRdRTacKeZRbi1kc2+61b0wCO+ybWvDalQljYx95x+6B+ZTih4XGZqR/txPzTTYqjkw2RiciLrGy5SHa/2TluBnf8JRFhw4U2Q+CQdR0UvkzI1CzO+TNdeOhEZtCTMyMz2jJk7BUfxd4pJDra3Agkio+mHfEA4crQTnYZ7qwePWXT2NZZtc9gnzhTHxk45T/MNdN49ofC/gU0AK1bNYwQNRT3I7u77bdTluD2Ns6H6fPHn8PTubtNdUib1IYn078xjPl8cd9cxJwbwe/mbUq1HF2HBrG8wB1guOO2O6tXEOJ1qFOXU+VvqM+04T62oZkqrftIqny2UxuZ/sPzWPVadK13ZJM6ek1bWsVCgD6k/mZ53x3xFVqvqEhoDgGxBOGl3KZ6y4qycG4m19INqMkgD4gNVQrpuY7q6+F6U0hIyPosjAYmutm3QLxPxqW+VTHK04J0xuhvC1fyqhqf+vIHV0jlHz+ih45TJrERiMKbw7SDqxYehIHWP+1anaMj5ymG9sH5S2MuXVPjflzjJPcphw7942NZCU05aeXorF4Wt+esDsz4j7afjCBF3sB6xj2CpC/kBLi5QOCKeoHLvAzxxglVC1QTlF10OYhNWZbRAKrSSh6rOiNrBQvI+acpnOerJzIKFudypK1IQtim7YYXZpk4KmecwXUgYAgflBAXDDtoOqZvMIOsZRxVTEGJatN2T9UjvKZEq13FL4YH4pLd2sSToMpViZE6+luGZWLhpHrOy55D1CnqE5MYGpQ/mLj2EhuJ6WrDLzCrVhKa0Qg7NyY0xK61I4nIvc5ndNmU74Bac7nHn5eXlxnMnQEaabJW1iM4dcmk8OHv6brT5cTC5zLvUuScDAGIUBcomVgRI3XDqiWABwJ56ws7lmhlON/luibao0H1Stj12KiIrkSIxQggRvytpMPKPU6T6oV187qh/iOmVH5btIQBQO5puutvO4Aj5Qn7cd8qO6uzBa0wPqsNYNbEZOv9kEymXOwJyr2jsiCtrhCoYkHv/Hr8/wCRLHwWmBTGknJTAgFDWrQ1oHz/ADUwqDdYXOWJno9OpStVPeP1kbnsZkiT0Oi8w8VXxfVJOjQT25jJA9hy/NXPj10QDGrpDfU6LznxAC0Fo+84/jj8AI/BcG6xrLMtPZVUrTWAv1Pr9mU6W+ZDtNCehOpKvDuJ0bekMiY+FrYLnf2HcqkvtSNfU+63b23M4DQE/Pun7AwgoWHQjiwrurve94Elp5RsBPKAO2dUBVueS5FRmeR2P5gNfmJCbseylTc5up+Bvyk/LB+SRNge35f4lVWuST5dQiOJ6dSs21C14MtcA5pG4OQrdwOwFJhj+JebeD/EDGkW9VwAn/SeTjOTTcds6esdF6xZN+AfrZHpU23YPkDMntNsac48yB/P8Tl5UDkaaK5NsV1twnmtpMWVwVBSGqcOsp3XI4eBui8QSjUYoqU5WU6ICc/ZRotfYAdCobQBBFWTx3FJYFx5EmJTf7AAZlR1QAotmeoi2nb+KJrzhZkcpkb9UkvWcpI6dlbngdUDWt2EkxrqnLYfOZHrUciVgEED3Q19bFzNJlWB9JoOAoTCaTkTKL9pyspn/wAcMkZzE4LY30XbfDDY+Imd1dqNElpIWm2DjkrEyUg8gTsJqdXao2E+vQ+U84s2JmwIS2pwjmha6xgQ7myZI1SMbK4amFrbyndTNgk4EL4dUcPhjWEe4rVnZ7qW6tyJ3HXZKLjMy6vSMoDgfOcCou2OQbainY9Fmc5kxGNvXgoi6umxgQUqD1FVq5UKA8mXW1igopwDJaj5TDhjIyg+H2hqaGB16J9StgGgDbUpVtgHE2aTSsTvxwP3+/pMpXPdcPvBMSgrqlyzBwg3nCpa1PMlmsuRguOQYTxGmwjn/wBgP0VA4v8AfPN94gtaDsBJcfqVc2V4kbHVIvFfDg5nmME1IMACXOa74XN+UrFqvZviNvXg4/P7/wCmel9l+3F2Cu7vPfpn+BKNms9waPfoNvyXNXgtxswnuCM/mnvh2zqNbHljJJ5jg+kdVYTQcG41I1/NaavZ9fhjdnP385NZ7bsS0qm3HX++Op5/Xt6lOBUaW7AGD66IcMbKZcboOa8l5JM8o5tNM8qWU29dP1Kw31eG+0ff5cTu6TUeLWHbH04H6nMfcJ4axxG7idOjfzcvYPDNHkt6bZ0Gh9TA+ULy2wvQHEgAggEDovT+Gv8AhaOw+i6dyKlYVep5TUaix799nn1/j5DqN3Phc/aOyhfV22Qda9AIjRZVTdF26kVjJMbCuEPWr5Smtfk6KGncOnX5pi6fHMx2+1A3uiNatdGUKgASF90Z1UlO86lW1JIxAp9oKrkxxWqBCvqJc69KiFwZyrWkgSWe0VdsgQ6uyULVHKP7qZlaVDVqgqc9QiUYbvOKHvRFhbh7s6BSV+Hk5assrd4qATjeENloKnBlafSOtq71yMiN6LW5EbrvywpBRDTO5XPMuQ7ZPE9lUm1cNPHaLkQxyFtqZRdOien4hd1GHrOFZWwPUJYmlrXOOiXNou6I6ztz0TSy/CZ1RweAY1pVXDdF060iDolrGO6JjQp/ypTYmlcngwe7sZ+JgPooqVJ0SQcGE7pUSNUUACIOiAWY6mW3Qhujj4eUQMCIp2jDBMpk+zZsF2LURpCI2jExpoHUnODNUyG4Gi6847oG4Ja7su/OmOiHZ5xo1OCV6xx8P+Tq6qEodrcZ9UYGA74Qd0/MDZVvA92Emkd38U8jr7+n7iLKtWX8o3KJvwA5o1hqh4dQLqzv5Wk+5MD6ldXLodG8fmVqDczn2qQ3Xef3kdJgBOklcVKfRaeRutMr7BNBgYPYlP8AEnC3lxcNzgH6pSOHuA+Jw20z7BXu7tvM+96iNsQqzf2zacNYSXHLtIGeiQ9K7t2J6DR65ygqz9/OdWdNrCJxtP09l63ZOAptOJgfQLxujReYJdIn8enovSeB1XPoUiNAwNM9W/D+SC0FlHkIrVe5hvxHr/cY3l7MgdUC5y04GSpadGRO6igKJwHL3Nk9yKVIQR7aovh1lz9I3RnErctbAHYIHvAbaJoq0LNUbT1EgK2HI6ytSJK4v6Q1HYEIvFBbES2kZa95/KBFy0XKahblzgOu6jr0S13KdVe8ZxFeE23djjr6yS3qbKanbGZJx0W+H2hJOMjKb+Rj2WS+/bwJ3PZuh8QAv9P9wQFd0aaKbbhSMpZXOaziekSrnmcvbhQ8qNe1Q8iTNk8Dpcfh07f7ckfipGeI3DAcR7D80BTrN/TQpqfL/tHuAlbB6TQGPrGlt4neP43ewAPz1TG08REzDnE9MAwe8en60SNe3cDt8DeiIt79tMghrDqDNNhHbUem6rwx6Sw59ZYrXiRNUFoc5ri0OLhA6a9R+W6t1CBuPm1UCjxhxAIIYdg1rY3nbSYTC08QOaDzEuMent+vRaqr3qXaFmW/SpcwYmXoOncf1BTUo6j5heb8Q8XZyaggkgNLYnYHtC6peLC4Al1UAakcoMGcawj/AK1/7Yk+zq/756RI6j+pqlJH+8fMLzJvjFhJDS8HYkDPqZRtPxAQ0/vJ2PKDnv1+Sn9a/wDbK/8AmJ/f+n+5eqoaREgg/wAwQdWjDSBA9wqnQ8RuB5nF/Lry8rTvpn3W3+LuaQOYZxAacf37ol1zj/zFP7Hrf/18M4EslWqWNAxnKW3t0ACV2+8L2scSfuzkAHORgdoSO/uA94YTDT94/wAo1jvsltqTY/u8GdDTaJNPSKzggeoEsnha1d5TqrtapkY/hGB8zJ9CEn4xdBtd3Ls0A+uZH67o6t4tp06ZILgGtkNaANBhsH0CoNjxkOqOFQmST8XU7z7rrUWe973E89q9AWBsUZH3/Efm8JMrt1zy5Ve4lenRmevZS0bwtbnXr1K2+IAcTAdGdob18o+83n09cJHXonzpIiNvr65WrbiIb0k69gpqN22o4u209fTupuDS0qeokgcYhFxb/wCnOR+tFYPBtd1SiW5+GpHSByiPx5kpfy8gzAGk6hdeFeMBj6rS6AQ0xEnV0fVLvbC5lVVHUKU+PfpL1XpDlJAnrH0WrNktA/JKB4iYP4yPYfgt0vEDIkPPfAWMFyMAQn0iI4ZmA7B69fnLjZM5R/lTVqYeewVFf4ibkioMdkrp+MmkkDbcsb7pDUtn4mdCl0KkeQ+/LM9KdSaBKAuqYeC0GJzt8lSbjxI0gkvEejZ+QS4eIKfUDsQObtgo1px+JsGZdRYbMhEJXon5/rPUrPgzWASZ91NXsGk/r5Lxiv4gnIDNP/Wwxr2Qh8RTA+HvDAD7LA1jE5Jnbr0dSptCcT2uztyCTEidcaBEvb1heI1vEPwiT+GnZAu4+3eDnYajCG08+sbRUFXE96hacvCqvHWZggdMGfcIL/zpiC8E9m6+6Vk+k0bR6z3+o5QSeq8EPFQf4h/SuP8Ay1Pt/S7+6mTJtHrF9NyJoz/j+6Vc5BTG2cYyIRCWRCloid99FwXKGpVgjUZVyCM6RgY2XdR+MIRlYdVHWuIH67q5BAr1xJ7n9Qu6VxDHDOsdNEHWq5lcc2IVCWeTJ6VTbY4k7KycEui6nnUb9lVU04FWIc4bQrEsxtxat8B7jCRW0ue2m0kl7g1vqTATHjNQco9U38G8Kb5orEfum83/ADcCG/Un/iqc4BMJckhRLRxKqKYgaAco9AICoHEeKE1Z2GAnXivisEMGp+m6qLHtLzzTBQ6cFRujL2ycCFm8JB1/WyXzGRvt6Iy8oU2gFj565/WUE1kmT/gLQ7EmKTO2StqEdlYbWs17JnURPTCrDx3gKZtdzWEA4nbRaNPqPDznqZNZpfGxt7juhRDCZdO+Rgx0WHiYboJPTYe6E4fe8wIJkwOih4nTI0ONc99ZWtrCte5Jz6qA92y0Z+/v/MZ1uJtDCZ3y051UXh24ms4k/eb9CP17KvXFecY2M+yK4M6HzOoI/BZDqWsYAzWdNXSj7ecg/SW++uB21Qle9LW4KCqVBBBQ3naDZaPF2icxaQxziFMu3EAH1/7XFW11fodT1UT9Fw2oYj9FY3dm7M3qqID7s04D3ndRVqZjm6b7rdYkKJ1b4SJ6YSzDqLSejWjKhe6SoGPXZcIz7IMACNLNuxmG1boFnJjOp9EJ5AnX+65p6rPMk/gqxgYhqeMmRVmgOInHVR1GQVPdDKHcShEZJmQAtVKOSo2uU/OpjEHM3S5SZRLHJdoi6T9FIwiTFyjqtkLZcslSVF9RpadT6rb7hx1KL12XAtWnKkuBTsu2AdfZSXtMACAhmNlSVmMqhaRiCueG1eV2vaEDyEZXZqfxbq5eYdxOvJA6K18GuqjbcllOTUgh7jDYAIAA1OZyqK0czhJ1IBPQE5KvV9xFreSmwYA5Wjs0f4SrDxiOq5JPpKvxeq81SXxzQNNPZC1Kgho33Ul/W53ud3+iAfqmr1FMeYye0eQ4g5kTMddkJRrNA9v0FOwHynD3S4oiYKsQYQ+p6LRrCFAuUOZe4winclugWXF058A6DvKHW0QdsYzxAIBOTOgibSpDge4Qq6YVQOJRGRiPLh+CheaFlWoow6VoLTIiYhraywVxlQMAIUb2QkxxPGJK987oavHz0/NdsCiuTt0ULSkXBmUSuqpUVFd1CgzGEczoFdcsLgaStvcpJJXu6qItnRauDkeihc9UIZGZMQFvk9EODoppUJg7ZlZS0NlixVHCSjUrKmnyWLFcGY5StWLFUkE4joEAsWK5U2VsaLFikk5KtHEP3o/+hWLEt46rz+n8xQNT6n6oW6+8trE7yiT3Ch9w+h+iWLFihlCYuVixDLmltYsUknS6p6haWK5IdVXAWLE6IWTMW2brFiFupVf4p0dR6IKqsWJcdOWKR60sVwfOTW2hXNXVYsSx3DMy9+8PRCvWLFa9S5pqIWLFZgnuf//Z",
    "https://i.ytimg.com/vi/eX2qFMC8cFo/maxresdefault.jpg",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chipmunk-nature-photos-1537973822.jpg",
    "https://media.istockphoto.com/id/680810342/photo/dog-watching-tv-on-the-couch.jpg?s=612x612&w=0&k=20&c=CQXmfuqlwL49GhcLDXIQSEZwq3iGpIkPJneWJUiI_0U=",
    "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png",
    "https://m.media-amazon.com/images/I/51hGiAQCw-L._SY580_.jpg",
    "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png",
    "https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png",
];

const Pieces: NextPage = () => {
    const [data, setData] = useState([] as IContent[]);
    const [imageData, setImageData] = useState([] as IContent[]);
    const [imageContent, setImageContent] = useState<string[]>([]);
    const [contents, setContents] = useState([] as IContent[]);

    useEffect(() => {
        const getAllContent = async () => {
            const response = await fetch("/api/content/getAllContent", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            setData(json.content);
            setContents(json.content);

            // Filter for image content only
            const imageContent = json.content.filter((ele: IContent) => {
                return ele.nodeType === "image";
            });
            setImageData(imageContent);

            // Get image urls
            const imageUrls = imageContent.map((ele: IContent) => {
                return ele.imageContent;
            });
            setImageContent(imageUrls);

            // console.log(imageUrls);
        };
        // console.log("yo");
        getAllContent();
    }, []);

    // console.log(tempData);
    // console.log(imageContent);
    // console.log(contents);

    return (
        <div className={styles.body}>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.menu}>
                    <h3>vous avez</h3>
                    <h1>CARTE BLANCHE</h1>
                </div>
                <div className={styles.scrollingGrid}>
                    <ScrollingGrid
                        data={contents}
                        // data={imageContent}
                        // data={tempData}
                        height="calc(100vh - 5em)"
                        width="67vw"
                    />
                </div>
            </div>
        </div>
    );
};

export default Pieces;
