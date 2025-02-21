"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ThemeProvider } from "./theme-provider"
import { ThemeToggle } from "./theme-toggle"
// Add new imports
import { TooltipProvider } from "@/components/ui/tooltip"

type FlexContainerProperties = {
  display: "flex" | "inline-flex"
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse"
  justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
  alignItems: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  alignContent: "flex-start" | "flex-end" | "center" | "stretch" | "space-between" | "space-around"
  flexWrap: "nowrap" | "wrap" | "wrap-reverse"
  gap: string
  rowGap: string
  columnGap: string
}

type FlexItemProperties = {
  flexGrow: string
  flexShrink: string
  flexBasis: string
  alignSelf: "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
  order: string
}

const gradients = [
  "bg-gradient-to-r from-pink-500 to-purple-500",
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-yellow-400 to-orange-500",
  "bg-gradient-to-r from-blue-400 to-indigo-500",
  "bg-gradient-to-r from-red-400 to-pink-500",
  "bg-gradient-to-r from-indigo-400 to-purple-500",
]

const defaultContainerProps: FlexContainerProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "stretch",
  flexWrap: "nowrap",
  gap: "0.5rem",
  rowGap: "0.5rem",
  columnGap: "0.5rem",
}

const defaultItemProps: FlexItemProperties = {
  flexGrow: "0",
  flexShrink: "1",
  flexBasis: "auto",
  alignSelf: "auto",
  order: "0",
}

export default function FlexboxPlayground() {
  const [containerProps, setContainerProps] = useState<FlexContainerProperties>(defaultContainerProps)
  const [itemProps, setItemProps] = useState<FlexItemProperties>(defaultItemProps)
  const [itemCount, setItemCount] = useState(3)
  const [isLandscape, setIsLandscape] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"container" | "item">("container")
  const [showStyleSection, setShowStyleSection] = useState(true)

  const handleContainerPropChange = useCallback((prop: keyof FlexContainerProperties, value: string) => {
    setContainerProps((prev) => ({ ...prev, [prop]: value }))
  }, [])

  const handleItemPropChange = useCallback((prop: keyof FlexItemProperties, value: string) => {
    setItemProps((prev) => ({ ...prev, [prop]: value }))
  }, [])

  const handleItemClick = useCallback((index: number) => {
    setSelectedItemIndex((prev) => (prev === index ? null : index))
    setActiveTab("item")
  }, [])

  const handleAddItem = useCallback(() => {
    setItemCount((prev) => Math.min(12, prev + 1))
  }, [])

  const handleRemoveItem = useCallback(() => {
    setItemCount((prev) => Math.max(1, prev - 1))
    setSelectedItemIndex((prev) => (prev === itemCount - 1 ? null : prev))
  }, [itemCount])

  const handleResetItem = useCallback(() => {
    setItemProps(defaultItemProps)
  }, [])

  const handleResetContainer = useCallback(() => {
    setContainerProps(defaultContainerProps)
  }, [])

  return (
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SidebarProvider defaultOpen>
          <div className="flex min-h-screen w-full">
            <Sidebar className="border-r border-white/10 bg-gray-900 text-white dark [&_button]:text-white [&_*]:border-white/10 [&_*]:text-white [&_.select-trigger]:text-white [&_select]:text-white [&_.tabs-trigger]:text-white [&_.accordion-trigger]:text-white [&_label]:text-white/70">
              <SidebarHeader className="border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Flexbox Playground</h2>
                    <p className="text-sm text-muted-foreground">Customize your layout</p>
                  </div>
                  <div className="flex gap-2">
                    <ThemeToggle />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={activeTab === "container" ? handleResetContainer : handleResetItem}
                      className="h-8 w-8"
                      title="Reset settings"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SidebarHeader>
              <SidebarContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Tabs
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as "container" | "item")}
                    className="flex-1"
                  >
                    <div className="flex items-center gap-2">
                      <TabsList className="w-full">
                        <TabsTrigger value="container" className="flex-1">
                          Container
                        </TabsTrigger>
                        <TabsTrigger value="item" className="flex-1">
                          Item
                        </TabsTrigger>
                      </TabsList>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowStyleSection(!showStyleSection)}
                        className="h-8 w-8 bg-gray-900 text-white hover:bg-gray-800"
                        title={showStyleSection ? "Hide styles" : "Show styles"}
                      >
                        {showStyleSection ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                      </Button>
                    </div>

                    <TabsContent value="container" className="space-y-4 mt-4">
                      <Accordion type="multiple" className="w-full space-y-4">
                        <AccordionItem value="display" className="border-border">
                          <AccordionTrigger>Display</AccordionTrigger>
                          <AccordionContent>
                            <Select
                              value={containerProps.display}
                              onValueChange={(value) => handleContainerPropChange("display", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 text-white border-white/10">
                                <SelectItem value="flex">flex</SelectItem>
                                <SelectItem value="inline-flex">inline-flex</SelectItem>
                              </SelectContent>
                            </Select>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="flexDirection" className="border-border">
                          <AccordionTrigger>Flex Direction</AccordionTrigger>
                          <AccordionContent>
                            <Select
                              value={containerProps.flexDirection}
                              onValueChange={(value) => handleContainerPropChange("flexDirection", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 text-white border-white/10">
                                <SelectItem value="row">row</SelectItem>
                                <SelectItem value="row-reverse">row-reverse</SelectItem>
                                <SelectItem value="column">column</SelectItem>
                                <SelectItem value="column-reverse">column-reverse</SelectItem>
                              </SelectContent>
                            </Select>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="justifyContent" className="border-border">
                          <AccordionTrigger>Justify Content</AccordionTrigger>
                          <AccordionContent>
                            <Select
                              value={containerProps.justifyContent}
                              onValueChange={(value) => handleContainerPropChange("justifyContent", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 text-white border-white/10">
                                <SelectItem value="flex-start">flex-start</SelectItem>
                                <SelectItem value="flex-end">flex-end</SelectItem>
                                <SelectItem value="center">center</SelectItem>
                                <SelectItem value="space-between">space-between</SelectItem>
                                <SelectItem value="space-around">space-around</SelectItem>
                                <SelectItem value="space-evenly">space-evenly</SelectItem>
                              </SelectContent>
                            </Select>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="alignItems" className="border-border">
                          <AccordionTrigger>Align Items</AccordionTrigger>
                          <AccordionContent>
                            <Select
                              value={containerProps.alignItems}
                              onValueChange={(value) => handleContainerPropChange("alignItems", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 text-white border-white/10">
                                <SelectItem value="flex-start">flex-start</SelectItem>
                                <SelectItem value="flex-end">flex-end</SelectItem>
                                <SelectItem value="center">center</SelectItem>
                                <SelectItem value="stretch">stretch</SelectItem>
                                <SelectItem value="baseline">baseline</SelectItem>
                              </SelectContent>
                            </Select>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="alignContent" className="border-border">
                          <AccordionTrigger>Align Content</AccordionTrigger>
                          <AccordionContent>
                            <Select
                              value={containerProps.alignContent}
                              onValueChange={(value) => handleContainerPropChange("alignContent", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 text-white border-white/10">
                                <SelectItem value="flex-start">flex-start</SelectItem>
                                <SelectItem value="flex-end">flex-end</SelectItem>
                                <SelectItem value="center">center</SelectItem>
                                <SelectItem value="stretch">stretch</SelectItem>
                                <SelectItem value="space-between">space-between</SelectItem>
                                <SelectItem value="space-around">space-around</SelectItem>
                              </SelectContent>
                            </Select>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="flexWrap" className="border-border">
                          <AccordionTrigger>Flex Wrap</AccordionTrigger>
                          <AccordionContent>
                            <Select
                              value={containerProps.flexWrap}
                              onValueChange={(value) => handleContainerPropChange("flexWrap", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 text-white border-white/10">
                                <SelectItem value="nowrap">nowrap</SelectItem>
                                <SelectItem value="wrap">wrap</SelectItem>
                                <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                              </SelectContent>
                            </Select>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="gap" className="border-border">
                          <AccordionTrigger>Gap</AccordionTrigger>
                          <AccordionContent className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm text-muted-foreground">Gap</label>
                              <Input
                                type="text"
                                value={containerProps.gap}
                                onChange={(e) => handleContainerPropChange("gap", e.target.value)}
                                placeholder="e.g., 1rem"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-muted-foreground">Row Gap</label>
                              <Input
                                type="text"
                                value={containerProps.rowGap}
                                onChange={(e) => handleContainerPropChange("rowGap", e.target.value)}
                                placeholder="e.g., 1rem"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-muted-foreground">Column Gap</label>
                              <Input
                                type="text"
                                value={containerProps.columnGap}
                                onChange={(e) => handleContainerPropChange("columnGap", e.target.value)}
                                placeholder="e.g., 1rem"
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>

                    <TabsContent value="item" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">
                          Selected Item: {selectedItemIndex !== null ? `#${selectedItemIndex + 1}` : "None"}
                        </label>
                        <p className="text-xs text-muted-foreground">Click on an item to edit its properties</p>
                      </div>

                      <Accordion type="multiple" className="w-full space-y-4">
                        <AccordionItem value="flexGrow" className="border-border">
                          <AccordionTrigger>Flex Grow</AccordionTrigger>
                          <AccordionContent>
                            <Input
                              type="text"
                              value={itemProps.flexGrow}
                              onChange={(e) => handleItemPropChange("flexGrow", e.target.value)}
                              placeholder="e.g., 1"
                            />
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="flexShrink" className="border-border">
                          <AccordionTrigger>Flex Shrink</AccordionTrigger>
                          <AccordionContent>
                            <Input
                              type="text"
                              value={itemProps.flexShrink}
                              onChange={(e) => handleItemPropChange("flexShrink", e.target.value)}
                              placeholder="e.g., 1"
                            />
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="flexBasis" className="border-border">
                          <AccordionTrigger>Flex Basis</AccordionTrigger>
                          <AccordionContent>
                            <Input
                              type="text"
                              value={itemProps.flexBasis}
                              onChange={(e) => handleItemPropChange("flexBasis", e.target.value)}
                              placeholder="e.g., auto, 100px"
                            />
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="alignSelf" className="border-border">
                          <AccordionTrigger>Align Self</AccordionTrigger>
                          <AccordionContent>
                            <Select
                              value={itemProps.alignSelf}
                              onValueChange={(value) => handleItemPropChange("alignSelf", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-900 text-white border-white/10">
                                <SelectItem value="auto">auto</SelectItem>
                                <SelectItem value="flex-start">flex-start</SelectItem>
                                <SelectItem value="flex-end">flex-end</SelectItem>
                                <SelectItem value="center">center</SelectItem>
                                <SelectItem value="baseline">baseline</SelectItem>
                                <SelectItem value="stretch">stretch</SelectItem>
                              </SelectContent>
                            </Select>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="order" className="border-border">
                          <AccordionTrigger>Order</AccordionTrigger>
                          <AccordionContent>
                            <Input
                              type="text"
                              value={itemProps.order}
                              onChange={(e) => handleItemPropChange("order", e.target.value)}
                              placeholder="e.g., 0, 1, -1"
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Items</label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleRemoveItem}
                        disabled={itemCount <= 1}
                        className="bg-gray-900 text-white hover:bg-gray-800"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleAddItem}
                        disabled={itemCount >= 12}
                        className="bg-gray-900 text-white hover:bg-gray-800"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SidebarContent>
            </Sidebar>

            {/* Add new styles panel */}
            <div
              className={`w-72 shrink-0 border-r border-white/10 bg-gray-900 text-white dark transition-all duration-300 ${
                showStyleSection ? "" : "w-0 opacity-0"
              }`}
            >
              <div className="w-72">
                <div className="p-4 border-b border-white/10">
                  <h2 className="text-lg font-semibold tracking-tight">Current Styles</h2>
                </div>
                <div className="p-4 space-y-8">
                  {/* Container Styles */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white/90 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-purple-500"></div>
                      Container
                    </h3>
                    <div className="text-sm space-y-2 pl-3 border-l-2 border-white/5">
                      {Object.entries(containerProps).map(([key, value]) => (
                        <div
                          key={key}
                          className="group flex items-start gap-2 hover:bg-white/5 p-1 rounded transition-colors"
                        >
                          <span className="text-white/50 font-mono text-xs pt-0.5 group-hover:text-white/70">
                            {key}:
                          </span>
                          <span className="text-white/90 font-mono text-xs pt-0.5">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Item Styles */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white/90 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                      Selected Item {selectedItemIndex !== null ? `#${selectedItemIndex + 1}` : ""}
                    </h3>
                    <div className="text-sm space-y-2 pl-3 border-l-2 border-white/5">
                      {selectedItemIndex !== null ? (
                        Object.entries(itemProps).map(([key, value]) => (
                          <div
                            key={key}
                            className="group flex items-start gap-2 hover:bg-white/5 p-1 rounded transition-colors"
                          >
                            <span className="text-white/50 font-mono text-xs pt-0.5 group-hover:text-white/70">
                              {key}:
                            </span>
                            <span className="text-white/90 font-mono text-xs pt-0.5">{value}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-white/50 italic text-xs">No item selected</p>
                      )}
                    </div>
                  </div>

                  {/* Device Info */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white/90 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-green-500"></div>
                      Device
                    </h3>
                    <div className="text-sm space-y-2 pl-3 border-l-2 border-white/5">
                      <div className="group flex items-start gap-2 hover:bg-white/5 p-1 rounded transition-colors">
                        <span className="text-white/50 font-mono text-xs pt-0.5 group-hover:text-white/70">
                          orientation:
                        </span>
                        <span className="text-white/90 font-mono text-xs pt-0.5">
                          {isLandscape ? "landscape" : "portrait"}
                        </span>
                      </div>
                      <div className="group flex items-start gap-2 hover:bg-white/5 p-1 rounded transition-colors">
                        <span className="text-white/50 font-mono text-xs pt-0.5 group-hover:text-white/70">items:</span>
                        <span className="text-white/90 font-mono text-xs pt-0.5">{itemCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 bg-background">
              <div className="mb-4 flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">Preview</h1>
                <div className="ml-auto flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsLandscape(!isLandscape)}
                    title="Toggle orientation"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center min-h-[600px]">
                <div
                  className={`relative bg-gray-900 rounded-[3rem] p-3 transition-all duration-300 dark:border dark:border-gray-800 ${
                    isLandscape ? "w-[600px] h-[300px]" : "w-[300px] h-[600px]"
                  }`}
                >
                  {/* Phone Frame */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-3xl" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
                  </div>

                  {/* Screen Content */}
                  <div className="bg-gray-900 w-full h-full rounded-[2rem] overflow-hidden transition-colors duration-300">
                    <div
                      className="w-full h-full"
                      style={{
                        display: containerProps.display,
                        flexDirection: containerProps.flexDirection,
                        justifyContent: containerProps.justifyContent,
                        alignItems: containerProps.alignItems,
                        alignContent: containerProps.alignContent,
                        flexWrap: containerProps.flexWrap,
                        gap: containerProps.gap,
                        rowGap: containerProps.rowGap,
                        columnGap: containerProps.columnGap,
                        padding: "0.7rem",
                      }}
                    >
                      <AnimatePresence>
                        {Array.from({ length: itemCount }).map((_, index) => (
                          <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`${
                              gradients[index % gradients.length]
                            } rounded-lg cursor-pointer transition-all duration-200 ${
                              selectedItemIndex === index ? "ring-2 ring-white" : ""
                            }`}
                            style={{
                              width: containerProps.flexDirection.includes("column") ? "auto" : "60px",
                              height: containerProps.flexDirection.includes("column") ? "60px" : "auto",
                              padding: "0.75rem",
                              flexGrow: selectedItemIndex === index ? itemProps.flexGrow : "0",
                              flexShrink: selectedItemIndex === index ? itemProps.flexShrink : "1",
                              flexBasis: selectedItemIndex === index ? itemProps.flexBasis : "auto",
                              alignSelf: selectedItemIndex === index ? itemProps.alignSelf : "auto",
                              order: selectedItemIndex === index ? itemProps.order : "0",
                            }}
                            onClick={() => handleItemClick(index)}
                          >
                            <div className="w-full h-full min-h-[40px] flex items-center justify-center">
                              <span className="text-white font-medium">{index + 1}</span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>Click on any item to edit its individual flex properties</p>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </TooltipProvider>
  )
}

