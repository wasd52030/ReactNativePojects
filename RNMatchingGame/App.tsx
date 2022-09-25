/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react"
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Card from "./src/Card"

const App = () => {

  const symbols = Array.from({ length: 26 }).map((_, index) => String.fromCharCode(65 + index))
  const [answers, setAnswer] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState<boolean[]>([])
  const [firstIndex, setFirstIndex] = useState<number | null>(null)
  const [secondIndex, setSecondIndex] = useState<number | null>(null)
  const [steps, setSetps] = useState(0)
  const [isEnded, setIsEnded] = useState(false)

  const onCardPress = (index: number) => {
    const o = [...isOpen]

    if (isOpen[index]) {
      return
    }

    o[index] = true

    if (firstIndex === null && secondIndex === null) {
      setIsOpen(o)
      setFirstIndex(index)
    } else if (firstIndex !== null && secondIndex === null) {
      setIsOpen(o)
      setSecondIndex(index)
    }

    setSetps(steps + 1)
  }

  const initGame = () => {
    const answerbase = symbols.sort(_ => Math.random() > 0.5 ? -1 : 1).slice(0, 8)
    const a = [...answerbase, ...answerbase]
    a.sort(_ => Math.random() > 0.5 ? -1 : 1)
    setAnswer(a)
    setIsOpen(Array.from({ length: answers.length }).fill(false) as boolean[])
  }

  const getResult = () => {
    if (firstIndex !== null && secondIndex !== null) {

      if (answers.length > 0) {
        const totalOpens = isOpen.filter(item => item)
        if (totalOpens.length === answers.length) {
          setIsEnded(true)
          return
        }
      }

      const ans1 = answers[firstIndex]
      const ans2 = answers[secondIndex]

      if (ans1 !== ans2) {
        setTimeout(() => {
          const o = [...isOpen]
          o[firstIndex] = false
          o[secondIndex] = false

          setIsOpen(o)
          setFirstIndex(null)
          setSecondIndex(null)
        }, 1000)
      } else {
        setFirstIndex(null)
        setSecondIndex(null)
      }
    }
  }

  const resetGame = () => {
    initGame()
    setFirstIndex(null)
    setSecondIndex(null)
    setSetps(0)
    setIsEnded(false)
  }

  useEffect(() => {
    initGame()
  }, [])

  const mouteSecondIndex = useRef(secondIndex)
  useEffect(() => {
    if (mouteSecondIndex.current !== secondIndex) {
      getResult()
    }
  }, [secondIndex])

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Matching Game</Text>
          <Text style={styles.heading}>With React Native</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.game}>
            {
              answers.map((item, index) => {
                return (
                  <Card
                    title={item} key={index}
                    fontSize={30} isShow={isOpen[index]}
                    onPress={() => onCardPress(index)}
                  />
                )
              })
            }
          </View>
        </View>
        <View style={styles.footer}>
          <Text>
            {(isEnded) ? `WIN! You have completed in ${steps} time(s).` : `You have tried ${steps} time(s).`}
          </Text>
          {
            (isEnded)
              ? (
                <TouchableOpacity onPress={resetGame} style={styles.resetBtn}>
                  <Text style={styles.resetBtnText}>
                    Try Again
                  </Text>
                </TouchableOpacity>
              )
              : null
          }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  main: {
    flex: 3,
    backgroundColor: "#fff"
  },
  footer: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center"
  },
  game: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  resetBtn: {
    borderColor: "#eee",
    padding: 8,
    borderRadius: 8,
    marginTop: 20
  },
  resetBtnText: {
    fontSize: 10
  }
})

export default App
